import React from 'react';
import { MobGame, useMobProvider } from '../../../providers/MobProvider';
import { MoveKeys } from '../../../themes';

type Props = {
  mobGame: MobGame;
};

export const MobPlayerDebug = ({ mobGame }: Props) => {
  const { makeMobPlayerMove, makeMugPlayerMove } = useMobProvider();
  return (
    <div style={{ position: 'absolute', fontSize: '0.6rem', top: 0, right: 0 }}>
      <div>
        <div>{mobGame.mugPlayer.player.name}</div>
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
      {mobGame.mobPlayers.map(mp => {
        const makeMove = (moveId: MoveKeys) => {
          makeMobPlayerMove(mobGame.id, mp.player.id, moveId);
        };
        return (
          <div key={mp.player.id}>
            <div>{mp.player.name}</div>
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
