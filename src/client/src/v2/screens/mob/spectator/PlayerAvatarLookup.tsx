import React from 'react';
import { PlayerAvatar } from '../../../components/player-avatar';
import { AvatarSizeStyles } from '../../../components/player-avatar/AvatarImage';
import { usePlayer } from '../../play/hooks/usePlayer';

type Props = {
  playerId: string;
  size: keyof AvatarSizeStyles;
};

export const PlayerAvatarLookup = ({
  playerId,
  size,
}: Props): JSX.Element | null => {
  const player = usePlayer(playerId);

  if (!player) {
    return null;
  }

  return <PlayerAvatar player={player} size={size} />;
};
