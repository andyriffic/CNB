import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlayersContext, Player } from '../../../contexts/PlayersProvider';
import { selectRandomOneOf } from '../../../utils/random';
import { Button } from '../../../../screens/styled';

const Container = styled.div``;
const PlayerName = styled.h2``;

type RandomPlayerSelectorProps = {
  selectedPlayer?: Player;
  setSelectedPlayer: (player: Player) => void;
};

export const RandomPlayerSelector = ({
  selectedPlayer,
  setSelectedPlayer,
}: RandomPlayerSelectorProps) => {
  const { allPlayers } = useContext(PlayersContext);
  console.log('PLAYER SELECTOR');

  const setNewRandomPlayer = (
    players: Player[],
    setPlayer: (player: Player) => void
  ) => {
    const randomPlayer = selectRandomOneOf(
      players.filter(p => !p.tags.includes('retired'))
    );
    setPlayer(randomPlayer);
  };

  useEffect(() => {
    if (allPlayers && allPlayers.length && !selectedPlayer) {
      setNewRandomPlayer(allPlayers, setSelectedPlayer);
    }
  }, [allPlayers]);

  return (
    <Container>
      <PlayerName>{selectedPlayer && selectedPlayer.name}</PlayerName>
      {selectedPlayer && (
        <button
          onClick={() => setNewRandomPlayer(allPlayers, setSelectedPlayer)}
        >
          Someone else
        </button>
      )}
    </Container>
  );
};
