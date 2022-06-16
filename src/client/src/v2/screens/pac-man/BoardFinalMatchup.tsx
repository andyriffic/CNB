import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Heading } from '../../../components/form/radio-select/styles';
import { SecondaryButton } from '../../../uplift/components/SecondaryButton';
import { useMatchupProvider } from '../../providers/MatchupProvider';
import { useCreateGame } from '../choose-players/hooks/useCreateGame';
import { BoardPlayer } from './BoardPlayer';
import { PacManUiState } from './hooks/usePacman/reducer';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
`;

type Props = {
  state: PacManUiState;
};

export function BoardFinalMatchup({ state }: Props): JSX.Element {
  const { addInstantMatchup } = useMatchupProvider();

  const player1 = useMemo(() => {
    return state.allPacPlayers.find(p => p.finishPosition === 1);
  }, [state]);

  const player2 = useMemo(() => {
    return state.allPacPlayers.find(p => p.finishPosition === 2);
  }, [state]);

  const canPlayFinal = useMemo(() => {
    return !!(player1 && player2);
  }, [player1, player2]);

  const startMatchup = () => {
    if (!(player1 && player2)) {
      return;
    }
    addInstantMatchup(
      player1.player.id,
      player2.player.id,
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
      <div>{player1 && player1.player.name}</div>
      <Heading>vs</Heading>
      <div>{player2 && player2.player.name}</div>
      {player1 && player2 && (
        <div>
          <SecondaryButton onClick={startMatchup}>Play</SecondaryButton>
        </div>
      )}
    </Container>
  );
}
