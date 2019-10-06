import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { RandomPlayerSelector } from './RandomPlayerSelector';
import { useFetchJson } from '../../hooks/useFetchJson';
import { GameHistory } from '../../types';
import { STATS_API_BASE_URL } from '../../../environment';
import { PlayersContext, Player } from '../../contexts/PlayersProvider';
import { getRandomPlayer } from './getRandomPlayer';

const PlayerSide = styled.div`
  flex: 1;
  text-align: center;
  justify-content: center;
`;

type RandomPlayerProps = {
  player1?: Player;
  setPlayer1: (player: Player) => void;
  player2?: Player;
  setPlayer2: (player: Player) => void;
};

export const RandomPlayers = ({
  player1,
  setPlayer1,
  player2,
  setPlayer2,
}: RandomPlayerProps) => {
  // const { allPlayers } = useContext(PlayersContext);
  console.log('PLAYER SELECTOR');

  const { allPlayers, loadingPlayers } = useContext(PlayersContext);

  const [loadingGameHistory, gameHistory] = useFetchJson<GameHistory>(
    `${STATS_API_BASE_URL}/game-result-history.json`
  );

  useEffect(() => {
    if (
      allPlayers.length &&
      gameHistory &&
      !loadingGameHistory &&
      !player1 &&
      !player2
    ) {
      const randomPlayer1 = getRandomPlayer(allPlayers, gameHistory.result);
      setPlayer1(randomPlayer1);
      setPlayer2(
        getRandomPlayer(allPlayers, gameHistory.result, [randomPlayer1])
      );
    }
  }, [
    loadingPlayers,
    allPlayers,
    loadingGameHistory,
    gameHistory,
    player1,
    player2,
  ]);

  const rerollPlayer = (setPlayer: (player: Player) => void) => () => {
    setPlayer(getRandomPlayer(allPlayers, gameHistory!.result));
  };

  return (
    <React.Fragment>
      <PlayerSide>
        <RandomPlayerSelector
          selectedPlayer={player1}
          reroll={rerollPlayer(setPlayer1)}
        />
      </PlayerSide>

      <PlayerSide>
        <RandomPlayerSelector
          selectedPlayer={player2}
          playerPosition="right"
          reroll={rerollPlayer(setPlayer2)}
        />
      </PlayerSide>
    </React.Fragment>
  );
};
