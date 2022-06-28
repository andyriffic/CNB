import { getPlayerIntegerAttributeValue } from '../../../uplift/utils/player';
import { selectRandomOneOf } from '../../../uplift/utils/random';
import { usePlayersProvider } from '../../providers/PlayersProvider';

type UsePlayerMaintenance = {
  setAllRacersRandomMoves: () => void;
  resetAllGameSettings: () => void;
  giveRandomSlMoves: () => void;
};

export const usePlayerMaintenance = (): UsePlayerMaintenance => {
  const { allPlayers, updatePlayer } = usePlayersProvider();

  return {
    setAllRacersRandomMoves: () => {
      const allRacers = allPlayers
        .filter(p => p.tags.includes('racer'))
        .filter(
          p => getPlayerIntegerAttributeValue(p.tags, 'rt_finish', 0) === 0
        );
      allRacers.forEach(p => {
        const moves = selectRandomOneOf([1, 2, 3, 4, 5, 6]);

        const updatedTags = [
          ...p.tags.filter(t => !t.startsWith('rt_moves')),
          `rt_moves:${moves}`,
        ];

        updatePlayer(p.id, updatedTags);
      });
    },
    resetAllGameSettings: () => {
      allPlayers.forEach(p => {
        const updatedTags = [
          ...p.tags
            .filter(t => !t.startsWith('racer'))
            .filter(t => !t.startsWith('rt_section'))
            .filter(t => !t.startsWith('rt_lane'))
            .filter(t => !t.startsWith('rt_square'))
            .filter(t => !t.startsWith('rt_moves'))
            .filter(t => !t.startsWith('rt_lap'))
            .filter(t => !t.startsWith('rt_finish'))
            .filter(t => !t.startsWith('pac_'))
            .filter(t => !t.startsWith('sl_')),
        ];

        updatePlayer(p.id, updatedTags);
      });
    },
    giveRandomSlMoves: () => {
      const eligiblePlayers = allPlayers.filter(p =>
        p.tags.includes('sl_participant')
      );
      eligiblePlayers.forEach(p => {
        const moves = selectRandomOneOf([1, 2, 3, 4, 5, 6]);

        const updatedTags = [
          ...p.tags.filter(t => !t.startsWith('sl_moves')),
          `sl_moves:${moves}`,
        ];

        updatePlayer(p.id, updatedTags);
      });
    },
  };
};
