import { Player } from '../../contexts/PlayersProvider';
import { GameHistoryRecord } from '../../types';
import { selectRandomOneOf } from '../../utils/random';

export const getRandomPlayer = (
  allPlayers: Player[],
  gameHistory: GameHistoryRecord[]
): Player => {
  const allRecentPlayerNames = gameHistory.reduce(
    (accumulator: string[], record) => {
      return [...accumulator, record.player1, record.player2];
    },
    []
  );
  const uniqueRecentPlayers = Array.from(new Set(allRecentPlayerNames)).splice(
    0,
    10
  );
  console.log('recent players', uniqueRecentPlayers);
  const eligiblePlayers = allPlayers
    .filter(p => !p.tags.includes('retired'))
    .filter(p => !uniqueRecentPlayers.includes(p.name));
  return selectRandomOneOf(eligiblePlayers);
};
