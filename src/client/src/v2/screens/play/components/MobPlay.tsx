import React from 'react';
import { Button } from '../../../components/ui/buttons';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobGame, MobPlayer } from '../../../providers/MobProvider';
import { MoveKeys } from '../../../themes';

type Props = {
  mobGame: MobGame;
  mobPlayer: MobPlayer;
  makeMove: (moveId: MoveKeys) => void;
};

export const MobPlay = ({ mobGame, mobPlayer, makeMove }: Props) => {
  const themeComponents = useThemeComponents();
  const dead = !mobPlayer.active;
  const selectMove =
    !dead && !(mobGame.ready && mobGame.resolved) && !mobPlayer.lastMoveId;
  const waitingResult = !dead && !mobGame.ready && mobPlayer.lastMoveId;

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>{mobGame.id}</h3>
      {!mobPlayer.active && <div>You dead! ☠️</div>}
      {waitingResult && <div>Waiting for Mob...</div>}
      {selectMove && themeComponents && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="button" onClick={() => makeMove('A')}>
            {themeComponents.moves['A']}
          </Button>
          <Button type="button" onClick={() => makeMove('B')}>
            {themeComponents.moves['B']}
          </Button>
          <Button type="button" onClick={() => makeMove('C')}>
            {themeComponents.moves['C']}
          </Button>
        </div>
      )}
    </div>
  );
};
