import { Player } from '../types/Player';
import styled, { css } from 'styled-components';
import { SOCKETS_ENDPOINT } from '../environment';
import { FacingDirection } from '../types/GameUi';
import { Label } from './ui/Label';
import { CSSProperties } from 'react';

export type AvatarSize = 'small' | 'medium';

const sizeStyles: { [key in AvatarSize]: CSSProperties } = {
  small: { width: '6vw', height: '10vw' },
  medium: { width: '10vw', height: '16vw' },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

const AvatarImage = styled.img<{ reverse: boolean }>`
  ${({ reverse }) =>
    reverse &&
    css`
      transform: scaleX(-1);
    `}
`;

const PlayerName = styled.div``;

type Props = {
  player: Player;
  size?: AvatarSize;
  facingDirection?: FacingDirection;
};

export function PlayerAvatar({
  player,
  size = 'medium',
  facingDirection = 'right',
}: Props): JSX.Element {
  return (
    <Container>
      <AvatarImage
        reverse={facingDirection === 'left'}
        src={`${SOCKETS_ENDPOINT}${player.avatarImageUrl}`}
        style={sizeStyles[size]}
      />
      <PlayerName>
        <Label>{player.name}</Label>
      </PlayerName>
    </Container>
  );
}
