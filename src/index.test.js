import { assert } from 'chai';
import sinon from 'sinon';
import createStore from './store/createStore';
import reducer from './state/reducer';
import receiveMessage from './receiveMessage';
import { incomingMessageTypes, outgoingMessageTypes } from './messages/typeConstants';
import { MOVES } from './state/Moves';
import { OUTCOMES } from './services/runGame';

describe('Cowboy/Ninja/Bear', () => {

  const player1Name = 'P1';
  const player2Name = 'P2';
  let store, sandbox, sendMessageSpy;

  before(() => {
    sandbox = sinon.createSandbox();
    sendMessageSpy = sandbox.spy();
  });

  const makeMove = (player, move) => {
    receiveMessage(store, {
      type: incomingMessageTypes.MAKE_MOVE,
      payload: { slot: player, move: move },
    }, sendMessageSpy);
  };

  describe('given no players connected', () => {

    describe('when one player connects', () => {

      before(() => {
        store = createStore(reducer);
        receiveMessage(store, {
          type: incomingMessageTypes.REQUEST_TO_CONNECT,
          payload: { playerName: player1Name, clientId: '#123' } }, sendMessageSpy);
      });

      it('then connects player to game', () => {
        const expectedPayload = { type: outgoingMessageTypes.ADDED_TO_GAME, payload: { slot: 'player1' } };
        assert.deepEqual(expectedPayload, sendMessageSpy.firstCall.args[0], 'Incorrect ADDED_TO_GAME payload');
      });

      it('then broadcasts game status', () => {
        const expectedPayload = {
          type: outgoingMessageTypes.GAME_STATUS,
          payload: {
            player1: { connected: true, name: player1Name, moved: false },
            player2: { connected: false, name: undefined, moved: false },
            gameResult: { outcome: OUTCOMES.PENDING },
          },
          recipients: { all: true },
        };

        assert.deepEqual(expectedPayload, sendMessageSpy.secondCall.args[0], 'Incorrect GAME_STATUS payload');
      });
    });

    describe('when spectator joins', () => {

      before(() => {
        store = createStore(reducer);
        sandbox.reset();
        receiveMessage(store, { type: incomingMessageTypes.SPECTATOR_JOIN }, sendMessageSpy);
      });

      it('then game status is broadcast', () => {
        const expectedPayload = {
          type: outgoingMessageTypes.GAME_STATUS,
          payload: {
            player1: { connected: false, name: undefined, moved: false },
            player2: { connected: false, name: undefined, moved: false },
            gameResult: { outcome: OUTCOMES.PENDING },
          },
          recipients: { all: true },
        };

        assert.deepEqual(expectedPayload, sendMessageSpy.firstCall.args[0], 'Incorrect GAME_STATUS payload');
      });
    })
  });

  describe('given one player connected', () => {

    before(() => {
      store = createStore(reducer);
      receiveMessage(store, {
        type: incomingMessageTypes.REQUEST_TO_CONNECT,
        payload: { playerName: player1Name, clientId: '#123' } }, sendMessageSpy);

      sandbox.reset();
    });

    describe('when second player connects', () => {

      before(() => {
        receiveMessage(store, {
          type: incomingMessageTypes.REQUEST_TO_CONNECT,
          payload: { playerName: player2Name, clientId: '#123' } }, sendMessageSpy);
      });

      it('then connects player to game', () => {
        const expectedPayload = { type: outgoingMessageTypes.ADDED_TO_GAME, payload: { slot: 'player2' } };
        assert.deepEqual(expectedPayload, sendMessageSpy.firstCall.args[0], 'Incorrect ADDED_TO_GAME payload');
      });

      it('then broadcasts game status', () => {
        const expectedPayload = {
          type: outgoingMessageTypes.GAME_STATUS,
          payload: {
            player1: { connected: true, name: player1Name, moved: false },
            player2: { connected: true, name: player2Name, moved: false },
            gameResult: { outcome: OUTCOMES.PENDING },
          },
          recipients: { all: true },
        };

        assert.deepEqual(expectedPayload, sendMessageSpy.secondCall.args[0], 'Incorrect GAME_STATUS payload');
      });
    });
  });

  describe('given two players connected', () => {

    before(() => {
      store = createStore(reducer);
      receiveMessage(store, {
        type: incomingMessageTypes.REQUEST_TO_CONNECT,
        payload: { playerName: player1Name, clientId: '#123' } }, sendMessageSpy);

      receiveMessage(store, {
        type: incomingMessageTypes.REQUEST_TO_CONNECT,
        payload: { playerName: player2Name, clientId: '#123' } }, sendMessageSpy);
    });

    describe('when player tries to connect', () => {
      before(() => {
        sandbox.reset();
        receiveMessage(store, {
          type: incomingMessageTypes.REQUEST_TO_CONNECT,
          payload: { playerName: 'Some Guy', clientId: '#123' } }, sendMessageSpy);
      });

      it('then rejects user', () => {
        const expectedPayload = { type: outgoingMessageTypes.PLAYER_SLOT_IS_FULL };
        assert.deepEqual(expectedPayload, sendMessageSpy.firstCall.args[0], 'Incorrect PLAYER_SLOT_IS_FULL payload');
      });
    });

    describe('given player1 makes a valid move', () => {

      before(() => {
        sandbox.reset();
        makeMove('player1', MOVES.COWBOY);
      });

      it('then broadcasts updated game status', () => {
        const expectedPayload = {
          type: outgoingMessageTypes.GAME_STATUS,
          payload: {
            player1: { connected: true, name: player1Name, moved: true },
            player2: { connected: true, name: player2Name, moved: false },
            gameResult: { outcome: OUTCOMES.PENDING },
          },
          recipients: { all: true },
        };
        assert.deepEqual(expectedPayload, sendMessageSpy.firstCall.args[0], 'Incorrect GAME_STATUS payload');
      });
    });

    describe('given both players make a valid move', () => {

      beforeEach(() => {
        sandbox.reset();
      });

      const getLastOutcome = () => sendMessageSpy.lastCall.args[0].payload.gameResult.outcome;

      it('then broadcast game result is correct when both players choose COWBOY', () => {
        makeMove('player1', MOVES.COWBOY);
        makeMove('player2', MOVES.COWBOY);
        assert.equal(OUTCOMES.DRAW, getLastOutcome(), 'Incorrect game result');
      });

      it('then broadcast game result is correct when ninja beats cowboy', () => {
        makeMove('player1', MOVES.NINJA);
        makeMove('player2', MOVES.COWBOY);
        assert.equal(OUTCOMES.PLAYER_ONE, getLastOutcome(), 'Incorrect game result');
      });

      it('then broadcast game result is correct when cowboy beats bear', () => {
        makeMove('player1', MOVES.COWBOY);
        makeMove('player2', MOVES.BEAR);
        assert.equal(OUTCOMES.PLAYER_ONE, getLastOutcome(), 'Incorrect game result');
      });

      it('then broadcast game result is correct when bear beats ninja', () => {
        makeMove('player1', MOVES.BEAR);
        makeMove('player2', MOVES.NINJA);
        assert.equal(OUTCOMES.PLAYER_ONE, getLastOutcome(), 'Incorrect game result');
      });
    });
  });
});
