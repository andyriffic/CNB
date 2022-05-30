import { Player } from '../types/Player';
import styled, { css } from 'styled-components';
import { SOCKETS_ENDPOINT } from '../environment';
import { FacingDirection } from '../types/GameUi';

const Container = styled.div`
  display: flex;
`;

const AvatarImage = styled.img<{ reverse: boolean }>`
  width: 10vw;
  height: 18vh;
  ${({ reverse }) =>
    reverse &&
    css`
      transform: scaleX(-1);
    `}
`;

type Props = {
  player: Player;
  facingDirection?: FacingDirection;
};

export function PlayerAvatar({
  player,
  facingDirection = 'right',
}: Props): JSX.Element {
  return (
    <Container>
      <AvatarImage
        reverse={facingDirection === 'left'}
        src={`${SOCKETS_ENDPOINT}/${player.avatarImageUrl}`}
      />
    </Container>
  );
}
