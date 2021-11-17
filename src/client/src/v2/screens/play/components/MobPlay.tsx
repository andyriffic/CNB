import { NavigateFn } from '@reach/router';
import React, { useRef } from 'react';
import { shuffleArray } from '../../../../uplift/utils/random';
import { Button } from '../../../components/ui/buttons';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobGame, MobPlayer } from '../../../providers/MobProvider';
import { MoveKeys } from '../../../themes';

type Props = {
  mobGame: MobGame;
  mobPlayer: MobPlayer;
  makeMove: (moveId: MoveKeys) => void;
  onGameOver: () => void;
};

export const MobPlay = ({
  mobGame,
  mobPlayer,
  makeMove,
  onGameOver,
}: Props) => {
  const themeComponents = useThemeComponents();
  const dead =
    (mobGame.roundState === 'viewed' && !mobPlayer.active) ||
    mobPlayer.lastRound < mobGame.round;
  const selectMove =
    !dead && !(mobGame.ready && mobGame.resolved) && !mobPlayer.lastMoveId;
  const waitingResult = !dead && !mobGame.ready && mobPlayer.lastMoveId;

  const randomisedMoves = useRef(shuffleArray<MoveKeys>(['A', 'B', 'C']));

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>{mobGame.id}</h3>
      {dead && <div>You dead! ☠️</div>}
      {waitingResult && <div>Waiting for Mob...</div>}
      {selectMove && themeComponents && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          {randomisedMoves.current.map(moveId => (
            <Button
              key={moveId}
              type="button"
              onClick={() => makeMove(moveId)}
              style={{ width: '33%' }}
            >
              {themeComponents.moves[moveId]}
            </Button>
          ))}
        </div>
      )}
      <div>
        {mobGame.gameOver && (
          <Button onClick={onGameOver}>&lt;Back to games</Button>
        )}
      </div>
    </div>
  );
};
