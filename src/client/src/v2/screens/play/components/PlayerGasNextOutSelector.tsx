import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GasPlayer } from '../../../providers/GasProvider';

const Container = styled.div`
  display: flex;
  gap: 10vw;
  transition: opacity 300ms ease-out;
  flex-wrap: wrap;
  padding-bottom: 50px;
`;

const Heading = styled.h3``;

const PlayerSelectButton = styled.button``;

type Props = {
  eligiblePlayers: GasPlayer[];
  selectPlayer: (playerId: string) => void;
};

export const PlayerGasNextOutSelector = ({
  eligiblePlayers,
  selectPlayer,
}: Props): JSX.Element => {
  return (
    <>
      <Heading>Who's next?</Heading>
      <Container>
        {eligiblePlayers.map(p => (
          <PlayerSelectButton
            key={p.player.id}
            onClick={() => selectPlayer(p.player.id)}
          >
            <PlayerAvatar player={p.player} size="small" />
            {p.player.name}
          </PlayerSelectButton>
        ))}
      </Container>
    </>
  );
};
