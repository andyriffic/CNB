import { selectRandomOneOf } from '../../../uplift/utils/random';
import { usePlayersProvider } from '../../providers/PlayersProvider';

type UsePlayerMaintenance = {
  setAllRacersRandomMoves: () => void;
};

export const usePlayerMaintenance = (): UsePlayerMaintenance => {
  const { allPlayers, updatePlayer } = usePlayersProvider();

  return {
    setAllRacersRandomMoves: () => {
      const allRacers = allPlayers.filter(p => p.tags.includes('racer'));
      allRacers.forEach(p => {
        const moves = selectRandomOneOf([1, 2, 3, 4]);

        const updatedTags = [
          ...p.tags.filter(t => !t.startsWith('rt_moves')),
          `rt_moves:${moves}`,
        ];

        updatePlayer(p.id, updatedTags);
      });
    },
  };
};
