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
  placingKey: string;
};

export const FinalEpicMatchup = ({ placingKey }: Props) => {
  const { allPlayers } = usePlayersProvider();
  const { addInstantMatchup } = useMatchupProvider();

  const player1 = useMemo(() => {
    return allPlayers.find(
      p => getPlayerIntegerAttributeValue(p.tags, placingKey, 0) === 1
    );
  }, [allPlayers]);

  const player2 = useMemo(() => {
    return allPlayers.find(
      p => getPlayerIntegerAttributeValue(p.tags, placingKey, 0) === 2
    );
  }, [allPlayers]);

  const canPlayFinal = useMemo(() => {
    return !!(player1 && player2);
  }, [player1, player2]);

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
      <Heading>Final</Heading>
      <div>{player1 && <PlayerAvatar player={player1} size="small" />}</div>
      <Heading>vs</Heading>
      <div>{player2 && <PlayerAvatar player={player2} size="small" />}</div>
      {player1 && player2 && (
        <div>
          <SecondaryButton onClick={startMatchup}>Play</SecondaryButton>
        </div>
      )}
    </Container>
  );
};
