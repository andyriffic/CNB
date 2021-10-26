import { getPlayerIntegerAttributeValue } from '../../../uplift/utils/player';
import { selectRandomOneOf } from '../../../uplift/utils/random';
import { usePlayersProvider } from '../../providers/PlayersProvider';

type UsePlayerMaintenance = {
  setAllRacersRandomMoves: () => void;
  resetAllRacersToStartLine: () => void;
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
    resetAllRacersToStartLine: () => {
      const allRacers = allPlayers.filter(p => p.tags.includes('racer'));
      allRacers.forEach(p => {
        const updatedTags = [
          ...p.tags
            .filter(t => !t.startsWith('rt_section'))
            .filter(t => !t.startsWith('rt_lane'))
            .filter(t => !t.startsWith('rt_square'))
            .filter(t => !t.startsWith('rt_moves'))
            .filter(t => !t.startsWith('rt_lap'))
            .filter(t => !t.startsWith('rt_finish')),
          'rt_moves:0',
        ];

        updatePlayer(p.id, updatedTags);
      });
    },
  };
};
