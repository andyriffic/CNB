import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/ui/buttons';
import { GameScreen } from '../../components/ui/GameScreen';
import { Player, usePlayersProvider } from '../../providers/PlayersProvider';
import { Board } from './Board';
import { usePacMan } from './hooks/usePacman';

const Container = styled.div`
  margin: 0 auto;
`;

type Props = {
  allPlayers: Player[];
};

const View = ({ allPlayers }: Props) => {
  const { triggerUpdate } = usePlayersProvider();
  const { uiState, movePlayer } = usePacMan(allPlayers);

  useEffect(() => {
    triggerUpdate();
  }, []);

  useEffect(() => {
    if (uiState.status !== 'moving-players') {
      return;
    }

    const interval = setInterval(() => {
      console.log('Tick');

      movePlayer();
    }, 250);
    return () => clearInterval(interval);
  }, [uiState.status]);

  return (
    <GameScreen scrollable={true}>
      <Container>
        <Board uiState={uiState} />
      </Container>
      <span>{uiState.status}</span>
      <Button onClick={movePlayer}>Move Player</Button>
    </GameScreen>
  );
};

export default View;
