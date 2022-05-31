import { pipe } from '@mobily/ts-belt';
import { MatchTournament } from './types';

export function createGame(playerIds: string[]): MatchTournament {
  return {
    rounds: [],
    currentRound: 0,
  };
}

function groupIntoTwos(playerIds: string[]): [string, string][] {
  // playerIds.reduce()
  return [];
}
