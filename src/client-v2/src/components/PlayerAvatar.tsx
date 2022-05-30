import { Player } from '../types/Player';
import styled from 'styled-components';
import { SOCKETS_ENDPOINT } from '../environment';

const Container = styled.div`
  display: flex;
`;

const AvatarImage = styled.img`
  width: 10vw;
  height: 18vh;
`;

type Props = {
  player: Player;
};

export function PlayerAvatar({ player }: Props): JSX.Element {
  return (
    <Container>
      <AvatarImage src={`${SOCKETS_ENDPOINT}/${player.avatarImageUrl}`} />
    </Container>
  );
}
