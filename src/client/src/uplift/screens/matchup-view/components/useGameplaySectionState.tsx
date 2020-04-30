import { Matchup, GAME_STATUS } from '../../../contexts/MatchupProvider';

export enum GameplaySectionState {
  UNKNOWN = 0,
  CREATE_GAME = 1,
  WAITING_ON_PAYERS = 2,
  GAME_READY = 3,
  GAME_FINISHED = 4,
}

export const useGameplaySectionState = (
  matchup: Matchup
): GameplaySectionState => {
  if (!matchup.gameInProgress) {
    return GameplaySectionState.CREATE_GAME;
  }

  if (
    matchup.gameInProgress &&
    matchup.gameInProgress.status !== GAME_STATUS.Finished
  ) {
    return GameplaySectionState.WAITING_ON_PAYERS;
  }

  if (
    matchup.gameInProgress &&
    matchup.gameInProgress.status === GAME_STATUS.ReadyToPlay
  ) {
    return GameplaySectionState.GAME_READY;
  }

  if (
    matchup.gameInProgress &&
    matchup.gameInProgress.status === GAME_STATUS.Finished
  ) {
    return GameplaySectionState.GAME_FINISHED;
  }

  return GameplaySectionState.UNKNOWN;
};
