import React, { useEffect } from 'react';
import styled from 'styled-components';
import { isFeatureEnabled } from '../../../featureToggle';
import { Button } from '../../components/ui/buttons';
import { GameScreen } from '../../components/ui/GameScreen';
import { Player, usePlayersProvider } from '../../providers/PlayersProvider';
import { Board } from './Board';
import { boardConfig } from './boardConfig';
import { usePacMan } from './hooks/usePacman';
import { usePacmanSound } from './hooks/usePacmanSound';
import { usePlayerAutoMove } from './hooks/usePlayerMoveTick';
import { useSyncData } from './hooks/useSyncData';

const Container = styled.div`
  margin: 0 auto;
`;

type Props = {
  allPlayers: Player[];
};

const saveDisabled = isFeatureEnabled('no-save');

const View = ({ allPlayers }: Props) => {
  const { triggerUpdate } = usePlayersProvider();
  const pacManService = usePacMan(allPlayers, boardConfig);
  usePacmanSound(pacManService.uiState);
  usePlayerAutoMove(pacManService);
  useSyncData(pacManService.uiState, saveDisabled);

  useEffect(() => {
    triggerUpdate();
  }, []);

  return (
    <GameScreen scrollable={true}>
      <Container>
        <Board uiState={pacManService.uiState} />
      </Container>
      <span>{pacManService.uiState.status}</span>
      <Button onClick={pacManService.startGame}>Start Game</Button>
    </GameScreen>
  );
};

export default View;
