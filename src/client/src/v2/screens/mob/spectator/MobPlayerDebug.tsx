import React from 'react';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { MobGame, useMobProvider } from '../../../providers/MobProvider';
import { MoveKeys } from '../../../themes';

type Props = {
  mobGame: MobGame;
};

export const MobPlayerDebug = ({ mobGame }: Props) => {
  const { makeMobPlayerMove, makeMugPlayerMove } = useMobProvider();

  const randomAllMobMoves = () => {
    mobGame.mobPlayers
      .filter(mp => mp.active && !mp.lastMoveId)
      .forEach(mp => {
        makeMobPlayerMove(
          mobGame.id,
          mp.playerId,
          selectRandomOneOf(['A', 'B', 'C'])
        );
      });
  };

  return (
    <div style={{ position: 'absolute', fontSize: '0.6rem', top: 0, right: 0 }}>
      <div>
        <div>{mobGame.mugPlayer.playerId}</div>
        <form style={{ display: 'flex' }}>
          <fieldset disabled={!!mobGame.mugPlayer.lastMoveId}>
            <button
              type="button"
              onClick={() => makeMugPlayerMove(mobGame.id, 'A')}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => makeMugPlayerMove(mobGame.id, 'B')}
            >
              B
            </button>
            <button
              type="button"
              onClick={() => makeMugPlayerMove(mobGame.id, 'C')}
            >
              C
            </button>
          </fieldset>
        </form>
      </div>
      <hr />
      <div>
        <button
          onClick={randomAllMobMoves}
          disabled={mobGame.mobPlayers.every(
            mp => !mp.active || !!mp.lastMoveId
          )}
        >
          RANDOM
        </button>
      </div>
      {mobGame.mobPlayers.map(mp => {
        if (!mp.active) return null;
        const makeMove = (moveId: MoveKeys) => {
          makeMobPlayerMove(mobGame.id, mp.playerId, moveId);
        };
        return (
          <div key={mp.playerId}>
            <div>{mp.playerId}</div>
            <form style={{ display: 'flex' }}>
              <fieldset disabled={!!mp.lastMoveId || !mp.active}>
                <button type="button" onClick={() => makeMove('A')}>
                  A
                </button>
                <button type="button" onClick={() => makeMove('B')}>
                  B
                </button>
                <button type="button" onClick={() => makeMove('C')}>
                  C
                </button>
              </fieldset>
            </form>
          </div>
        );
      })}
    </div>
  );
};
