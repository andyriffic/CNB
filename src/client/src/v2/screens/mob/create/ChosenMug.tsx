import React from 'react';
import styled from 'styled-components';
import { fadeInAnimation } from '../../../../uplift/components/animations';
import { PlayerAvatarWithBirthday } from '../../../components/AvatarWithBirthday';
import { SubHeading } from '../../../components/ui/Atoms';
import { Player } from '../../../providers/PlayersProvider';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const Text = styled.div`
  animation: ${fadeInAnimation} 500ms ease-out 0s both;
  margin-right: 2vw;
`;
const MugAvatar = styled.div`
  animation: ${fadeInAnimation} 500ms ease-out 700ms both;
`;

type Props = {
  player: Player;
};

export function ChosenMug({ player }: Props): JSX.Element {
  return (
    <Container>
      <Text>
        <SubHeading>Everyone vs:</SubHeading>
      </Text>
      <MugAvatar>
        <PlayerAvatarWithBirthday player={player} size="medium" />
      </MugAvatar>
    </Container>
  );
}
