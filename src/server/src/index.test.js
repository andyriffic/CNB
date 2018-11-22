import { assert } from 'chai';
import sinon from 'sinon';
import createStore from './store/createStore';
import reducer from './state/reducer';
import receiveMessage from './receiveMessage';
import { incomingMessageTypes } from './messages/typeConstants';
import { MOVES } from './state/Moves';
import { OUTCOMES } from './services/runGame';

describe('Cowboy/Ninja/Bear', () => {

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

  const runGame = () => {
    receiveMessage(store, {
      type: incomingMessageTypes.RUN_GAME,
    }, sendMessageSpy);
  };

  describe('given two players connected', () => {

    describe('given both players make a valid move', () => {

      beforeEach(() => {
        sandbox.reset();

        store = createStore(reducer);
        sendMessageSpy = sandbox.spy();
      });

      const getLastOutcome = () => {
        return sendMessageSpy.lastCall.args[0].payload.result;
      };

      it('then broadcast game result is correct when both players choose COWBOY', () => {
        makeMove('player1', MOVES.COWBOY);
        makeMove('player2', MOVES.COWBOY);
        runGame();

        assert.equal(true, getLastOutcome().draw, 'Incorrect game result');
      });

      it('then broadcast game result is correct when ninja beats cowboy', () => {
        makeMove('player1', MOVES.NINJA);
        makeMove('player2', MOVES.COWBOY);
        runGame();

        assert.equal(OUTCOMES.PLAYER_ONE, getLastOutcome().winner, 'Incorrect game result');
      });

      it('then broadcast game result is correct when cowboy beats bear', () => {
        makeMove('player1', MOVES.COWBOY);
        makeMove('player2', MOVES.BEAR);
        runGame();

        assert.equal(OUTCOMES.PLAYER_ONE, getLastOutcome().winner, 'Incorrect game result');
      });

      it('then broadcast game result is correct when bear beats ninja', () => {
        makeMove('player1', MOVES.BEAR);
        makeMove('player2', MOVES.NINJA);
        runGame();

        assert.equal(OUTCOMES.PLAYER_ONE, getLastOutcome().winner, 'Incorrect game result');
      });
    });
  });
});
