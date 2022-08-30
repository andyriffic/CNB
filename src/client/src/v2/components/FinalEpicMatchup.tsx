import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Heading } from '../../components/form/radio-select/styles';
import { SecondaryButton } from '../../uplift/components/SecondaryButton';
import { getPlayerIntegerAttributeValue } from '../../uplift/utils/player';
import { useMatchupProvider } from '../providers/MatchupProvider';
import { usePlayersProvider } from '../providers/PlayersProvider';
import { PlayerAvatar } from './player-avatar';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  background: white;
  padding: 10px;
  border-radius: 4px;
`;

type Props = {
  heading?: string;
  placingKey: string;
  winnerKey?: string;
  placePositions?: [number, number];
};

export const FinalEpicMatchup = ({
  heading,
  placingKey,
  winnerKey,
  placePositions = [1, 2],
}: Props) => {
  const { allPlayers } = usePlayersProvider();
  const { addInstantMatchup } = useMatchupProvider();

  const player1 = useMemo(() => {
    return allPlayers.find(
      p =>
        getPlayerIntegerAttributeValue(p.tags, placingKey, 0) ===
        placePositions[0]
    );
  }, [allPlayers]);

  const player2 = useMemo(() => {
    return allPlayers.find(
      p =>
        getPlayerIntegerAttributeValue(p.tags, placingKey, 0) ===
        placePositions[1]
    );
  }, [allPlayers]);

  const winner = useMemo(() => {
    if (!winnerKey) {
      return;
    }
    return allPlayers.find(p => p.tags.includes(winnerKey));
  }, [allPlayers]);

  const startMatchup = () => {
    if (!(player1 && player2)) {
      return;
    }
    addInstantMatchup(
      player1.id,
      player2.id,
      2,
      'rock-paper-scissors-classic',
      matchupId => {
        window.location.href = `/spectator/${matchupId}`;
      }
    );
  };

  return (
    <Container>
      {heading && <Heading>{heading}</Heading>}
      <div>{player1 && <PlayerAvatar player={player1} size="small" />}</div>
      <Heading>vs</Heading>
      <div>{player2 && <PlayerAvatar player={player2} size="small" />}</div>
      {player1 && player2 && !winner && (
        <div>
          <SecondaryButton onClick={startMatchup}>Play</SecondaryButton>
        </div>
      )}
      {winner && (
        <>
          <div>
            <Heading>Winner:</Heading>
          </div>
          <div>
            <PlayerAvatar player={winner} size="small" />
          </div>
        </>
      )}
    </Container>
  );
};
