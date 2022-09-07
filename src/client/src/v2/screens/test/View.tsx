import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { RotatingPlayerCarousel } from '../../components/RotatingPlayerCarousel';
import { GameScreen } from '../../components/ui/GameScreen';
import { usePlayersProvider } from '../../providers/PlayersProvider';

const Container = styled.div`
  margin: 0 auto;
  background-size: contain;
  position: relative;
  padding: 40px 0;
  height: 100%;
`;

const View = () => {
  const { allPlayers } = usePlayersProvider();

  const [numPlayers, setNumPlayers] = useState(5);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [transparent, setTransparent] = useState(false);

  const carouselPlayers = useMemo(() => {
    return allPlayers.slice(0, numPlayers);
  }, [numPlayers]);

  return (
    <GameScreen scrollable={false}>
      <label htmlFor="displayIndex">Display index</label>
      <input
        id="displayIndex"
        type="number"
        value={displayIndex}
        step={1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          let val = e.target.valueAsNumber;
          setDisplayIndex(val);
        }}
      />
      <label htmlFor="numPlayers">Players</label>

      <input
        id="numPlayers"
        type="number"
        min={0}
        max={20}
        value={numPlayers}
        step={1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          let val = e.target.valueAsNumber;
          setNumPlayers(val);
        }}
      />

      <label htmlFor="transparent">Transparent</label>
      <input
        id="transparent"
        type="checkbox"
        checked={transparent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTransparent(!!e.target.checked);
        }}
      />

      <Container>
        <RotatingPlayerCarousel
          players={carouselPlayers}
          displayIndex={displayIndex}
          transparent={transparent}
        />
      </Container>
    </GameScreen>
  );
};

export default View;
