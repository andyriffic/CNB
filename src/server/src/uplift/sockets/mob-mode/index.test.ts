import { expect } from 'chai';
import {
  createMobGame,
  isMobGameReady,
  makeMobPlayerMove,
  makeMugPlayerMove,
  resolveMobGame,
} from '.';
import { Player } from '../../services/player/types';

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
    updatedMobGame.mobPlayers.find((mp) => mp.player.id === testPlayer2.id)
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

  const resolvedGame = resolveMobGame(player2Moved);
  expect(resolvedGame.mugPlayer.lives).to.equal(2);
  expect(resolvedGame.mugPlayer.lastMoveId).to.be.undefined;
  expect(resolvedGame.mobPlayers[0].active).to.be.false;
  expect(resolvedGame.mobPlayers[0].lastMoveId).to.be.undefined;
  expect(resolvedGame.mobPlayers[1].active).to.be.true;
  expect(resolvedGame.mobPlayers[1].lastMoveId).to.be.undefined;
});
