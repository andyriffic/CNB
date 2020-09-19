import {
  Game,
  GAME_STATUS,
  Matchup,
  SpectatorMove,
} from '../../../../uplift/contexts/MatchupProvider';

const mockGame: Game = {
  id: 'test-game',
  status: GAME_STATUS.WaitingPlayerMoves,
  moves: [
    {
      moved: false,
      playerAvatarUrl: '/players/andy.png',
      playerId: 'andy',
      playerName: 'Andy',
      usedPowerup: false,
    },
    {
      moved: false,
      playerAvatarUrl: '/players/dunny.png',
      playerId: 'dunny',
      playerName: 'Dunny',
      usedPowerup: false,
    },
  ],
  playMode: 'Timebomb',
  trophyReset: false,
  trophyWon: false,
  viewed: false,
  attributes: { playerIndexHoldingTimebomb: 1, exploded: false, gameCount: 1 },
};

export const mockMatchup: Matchup = {
  id: 'blah',
  teams: [
    {
      id: '1',
      name: 'team 1',
      points: 0,
      trophies: 0,
      tags: [],
      playerNames: [],
    },
    {
      id: '2',
      name: 'team 2',
      points: 0,
      trophies: 0,
      tags: [],
      playerNames: [],
    },
  ],
  gameInProgress: mockGame,
  trophyGoal: 0,
  bonusPoints: 0,
  themeId: 'rock-paper-scissors-classic',
};

export const withPlayerMoved = (playerIndex: number) => (
  matchup: Matchup
): Matchup => {
  if (!matchup.gameInProgress) {
    throw '';
  }
  const updatedMoves: [SpectatorMove, SpectatorMove] = [
    { ...matchup.gameInProgress.moves[0] },
    { ...matchup.gameInProgress.moves[1] },
  ];

  updatedMoves[playerIndex].moved = true;
  return {
    ...matchup,
    gameInProgress: {
      ...matchup.gameInProgress,
      moves: updatedMoves,
    },
  };
};

export const withDrawnResult = (matchup: Matchup): Matchup => {
  if (!matchup.gameInProgress) {
    throw '';
  }

  return {
    ...matchup,
    gameInProgress: {
      ...matchup.gameInProgress,
      result: {
        winnerIndex: undefined,
        draw: true,
        moves: [
          { moveId: 'C', powerUpId: 'NONE' },
          { moveId: 'C', powerUpId: 'NONE' },
        ],
      },
    },
  };
};

export const withBonusPoints = (bonusPoints: number) => (matchup: Matchup) => {
  return {
    ...matchup,
    bonusPoints,
  };
};
