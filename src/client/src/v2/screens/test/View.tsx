import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { RotatingPlayerCarousel } from '../../components/RotatingPlayerCarousel';
import { GameScreen } from '../../components/ui/GameScreen';
import { usePlayersProvider } from '../../providers/PlayersProvider';

const MAX_PLAYERS = 17;

const Container = styled.div`
  margin: 0 auto;
  background-size: contain;
  position: relative;
  padding: 40px 0;
  height: 100%;
`;

const View = () => {
  const { allPlayers } = usePlayersProvider();

  const [displayIndex, setDisplayIndex] = useState(0);

  const carouselPlayers = useMemo(() => {
    return allPlayers.slice(0, MAX_PLAYERS);
  }, []);

  return (
    <GameScreen scrollable={false}>
      <input
        type="number"
        value={displayIndex}
        step={1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          let val = e.target.valueAsNumber;
          setDisplayIndex(val);
        }}
      />
      <Container>
        <RotatingPlayerCarousel
          players={carouselPlayers}
          displayIndex={displayIndex}
        />
      </Container>
    </GameScreen>
  );
};

export default View;
