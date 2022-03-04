import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/ui/buttons';
import { GameScreen } from '../../components/ui/GameScreen';
import { Player, usePlayersProvider } from '../../providers/PlayersProvider';
import { Board } from './Board';
import { boardConfig } from './boardConfig';
import { usePacMan } from './hooks/usePacman';
import { usePlayerAutoMove } from './hooks/usePlayerMoveTick';

const Container = styled.div`
  margin: 0 auto;
`;

type Props = {
  allPlayers: Player[];
};

const View = ({ allPlayers }: Props) => {
  const { triggerUpdate } = usePlayersProvider();
  const pacManService = usePacMan(allPlayers, boardConfig);
  usePlayerAutoMove(pacManService);

  useEffect(() => {
    triggerUpdate();
  }, []);

  return (
    <GameScreen scrollable={true}>
      <Container>
        <Board uiState={pacManService.uiState} />
      </Container>
      <span>{pacManService.uiState.status}</span>
      <Button onClick={pacManService.movePlayer}>Move Player</Button>
    </GameScreen>
  );
};

export default View;
