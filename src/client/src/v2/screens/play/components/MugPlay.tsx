import React from 'react';
import { Button } from '../../../components/ui/buttons';
import { MobGame, MugPlayer } from '../../../providers/MobProvider';
import { MoveKeys } from '../../../themes';

type Props = {
  mobGame: MobGame;
  mugPlayer: MugPlayer;
  makeMove: (moveId: MoveKeys) => void;
};

export const MugPlay = ({ mobGame, mugPlayer, makeMove }: Props) => {
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>{mobGame.id}</h3>
      <div>You da mug! ☕️</div>
    </div>
  );
};
