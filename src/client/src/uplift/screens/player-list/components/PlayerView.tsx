import React from 'react';
import styled from 'styled-components';
import { Player } from '../../../contexts/PlayersProvider';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import { fadeInAnimation } from '../../../components/animations';

const Container = styled.div<{ index: number }>`
  overflow: hidden;
  width: 20vmin;
  box-shadow: 0px 13px 21px -5px rgba(0, 0, 0, 0.3);
  animation: ${fadeInAnimation} 800ms ease-out
    ${props => props.index * 100 + 200}ms 1 both;
`;

const Name = styled.h4`
  margin: 0;
  padding: 0;
  text-align: center;
  padding: 0.6em 0;
  background-color: white;
  font-size: 0.7rem;
`;

const PlayerCharacter = styled.div`
  height: 30vmin;
  padding: 30px;
  background-color: #f8f8f8;
  text-align: center;
`;

const PlayerImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const PlayersView = ({
  player,
  index,
}: {
  player: Player;
  index: number;
}) => {
  return (
    <Container className="margins-off" index={index}>
      <PlayerCharacter>
        <PlayerImage src={`${SOCKETS_ENDPOINT}${player.avatarImageUrl}`} />
      </PlayerCharacter>
      <Name>{player.name}</Name>
    </Container>
  );
};
