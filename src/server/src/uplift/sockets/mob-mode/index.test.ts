import { expect } from 'chai';
import {
  assignGamePoints,
  createMobGame,
  isMobGameReady,
  makeMobPlayerMove,
  makeMugPlayerMove,
  resetForNextRoundMobGame,
  resolveMobGame,
} from '.';
import { Player } from '../../services/player/types';
import { MobGame } from './types';

const testPlayer1: Player = {
  id: 'test-1',
  name: 'Test 1',
  tags: [],
  avatarImageUrl: '',
};

const testPlayer2: Player = {
  id: 'test-2',
  name: 'Test 2',
  tags: [],
  avatarImageUrl: '',
};

const testPlayer3: Player = {
  id: 'test-3',
  name: 'Test 3',
  tags: [],
  avatarImageUrl: '',
};

const testPlayer4: Player = {
  id: 'test-4',
  name: 'Test 4',
  tags: [],
  avatarImageUrl: '',
};

it('Creates game id correctly', () => {
  const createdMobGame = createMobGame(testPlayer1, [testPlayer2, testPlayer3]);
  expect(createdMobGame.id).not.to.be.null;
});

it('Creates game with players correctly', () => {
  const createdMobGame = createMobGame(testPlayer1, [testPlayer2, testPlayer3]);
  expect(createdMobGame.mugPlayer.player.id).to.equal(testPlayer1.id);
  expect(
    createdMobGame.mobPlayers.find((mp) => mp.player.id === testPlayer2.id)
  ).not.to.be.undefined;
  expect(
    createdMobGame.mobPlayers.find((mp) => mp.player.id === testPlayer3.id)
  ).not.to.be.undefined;
});

it('Makes mug player move correctly', () => {
  const mobGame = createMobGame(testPlayer1, [testPlayer2, testPlayer3]);
  const updatedMobGame = makeMugPlayerMove(mobGame, 'A');
  expect(updatedMobGame.mugPlayer.lastMoveId).to.equal('A');
});

it('Makes mob player move correctly', () => {
  const mobGame = createMobGame(testPlayer1, [testPlayer2, testPlayer3]);
  const updatedMobGame = makeMobPlayerMove(mobGame, testPlayer2.id, 'A');
  expect(
    updatedMobGame.mobPlayers.find((mp) => mp.player.id === testPlayer2.id)!
      .lastMoveId
  ).to.equal('A');
});

it('Mob Game not ready when no players moved', () => {
  const mobGame = createMobGame(testPlayer1, [testPlayer2, testPlayer3]);
  expect(isMobGameReady(mobGame)).to.be.false;
});

it('Mob Game ready when all players moved', () => {
  const mobGame = createMobGame(testPlayer1, [testPlayer2, testPlayer3]);
  const mugPlayerMovedResult = makeMugPlayerMove(mobGame, 'A');
  const player1Moved = makeMobPlayerMove(
    mugPlayerMovedResult,
    testPlayer2.id,
    'B'
  );
  const player2Moved = makeMobPlayerMove(player1Moved, testPlayer3.id, 'C');

  expect(isMobGameReady(player2Moved)).to.be.true;
});

it('Resolved mob game is correct', () => {
  const mobGame = createMobGame(testPlayer1, [testPlayer2, testPlayer3]);
  const mugPlayerMovedResult = makeMugPlayerMove(mobGame, 'A');
  const player1Moved = makeMobPlayerMove(
    mugPlayerMovedResult,
    testPlayer2.id,
    'B'
  );
  const player2Moved = makeMobPlayerMove(player1Moved, testPlayer3.id, 'C');

  const resolvedGame = resetForNextRoundMobGame(resolveMobGame(player2Moved));
  expect(resolvedGame.mugPlayer.lives).to.equal(2);
  expect(resolvedGame.mugPlayer.lastMoveId).to.be.undefined;
  expect(resolvedGame.mobPlayers[0].active).to.be.false;
  expect(resolvedGame.mobPlayers[0].lastMoveId).to.be.undefined;
  expect(resolvedGame.mobPlayers[1].active).to.be.true;
  expect(resolvedGame.mobPlayers[1].lastMoveId).to.be.undefined;
});

it('Calculates points correctly when Mug player wins', () => {
  const mobGame: MobGame = {
    id: 'test-game',
    gameType: 'standard',
    resolved: true,
    round: 3,
    roundState: 'viewed',
    mugPlayer: { lives: 1, player: testPlayer1 },
    mobPlayers: [
      { player: testPlayer2, active: false, lastRound: 1 },
      { player: testPlayer3, active: false, lastRound: 2 },
      { player: testPlayer4, active: false, lastRound: 3 },
    ],
    points: { mugPlayer: 0, mobPlayers: [] },
  };

  const mobGameWithPoints = assignGamePoints(mobGame);

  expect(mobGameWithPoints.points.mugPlayer).to.equal(6);
  expect(
    mobGameWithPoints.points.mobPlayers.find(
      (mp) => mp.playerId === testPlayer2.id
    )!.points
  ).to.equal(1);
  expect(
    mobGameWithPoints.points.mobPlayers.find(
      (mp) => mp.playerId === testPlayer3.id
    )!.points
  ).to.equal(2);
  expect(
    mobGameWithPoints.points.mobPlayers.find(
      (mp) => mp.playerId === testPlayer4.id
    )!.points
  ).to.equal(3);
});

it('Calculates points correctly when One mob player wins', () => {
  const mobGame: MobGame = {
    id: 'test-game',
    gameType: 'standard',
    resolved: true,
    round: 3,
    roundState: 'viewed',
    mugPlayer: { lives: 0, player: testPlayer1 },
    mobPlayers: [
      { player: testPlayer2, active: false, lastRound: 1 },
      { player: testPlayer3, active: false, lastRound: 2 },
      { player: testPlayer4, active: true, lastRound: 3 },
    ],
    points: { mugPlayer: 0, mobPlayers: [] },
  };

  const mobGameWithPoints = assignGamePoints(mobGame);

  expect(mobGameWithPoints.points.mugPlayer).to.equal(1);
  expect(
    mobGameWithPoints.points.mobPlayers.find(
      (mp) => mp.playerId === testPlayer2.id
    )!.points
  ).to.equal(2);
  expect(
    mobGameWithPoints.points.mobPlayers.find(
      (mp) => mp.playerId === testPlayer3.id
    )!.points
  ).to.equal(4);
  expect(
    mobGameWithPoints.points.mobPlayers.find(
      (mp) => mp.playerId === testPlayer4.id
    )!.points
  ).to.equal(3);
});

it('Calculates points correctly when two mob players wins', () => {
  const mobGame: MobGame = {
    id: 'test-game',
    gameType: 'standard',
    resolved: true,
    round: 3,
    roundState: 'viewed',
    mugPlayer: { lives: 0, player: testPlayer1 },
    mobPlayers: [
      { player: testPlayer2, active: false, lastRound: 1 },
      { player: testPlayer3, active: true, lastRound: 3 },
      { player: testPlayer4, active: true, lastRound: 3 },
    ],
    points: { mugPlayer: 0, mobPlayers: [] },
  };

  const mobGameWithPoints = assignGamePoints(mobGame);

  expect(mobGameWithPoints.points.mugPlayer).to.equal(0);
  expect(
    mobGameWithPoints.points.mobPlayers.find(
      (mp) => mp.playerId === testPlayer2.id
    )!.points
  ).to.equal(2);
  expect(
    mobGameWithPoints.points.mobPlayers.find(
      (mp) => mp.playerId === testPlayer3.id
    )!.points
  ).to.equal(6);
  expect(
    mobGameWithPoints.points.mobPlayers.find(
      (mp) => mp.playerId === testPlayer4.id
    )!.points
  ).to.equal(6);
});
