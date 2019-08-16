import React from 'react';
import styled from 'styled-components';
import { Matchup, GAME_STATUS } from '../../../contexts/MatchupProvider';
import { Button } from '../../../../screens/styled';
import { GameWaitingOnPlayers } from './GameWaitingOnPlayers';
import { GameResult } from './GameResult';

const Container = styled.div`
  text-align: center;
`;

export const GamePlaySection = ({
  matchup,
  startGame,
  playGame,
  onGameFinished,
}: {
  matchup: Matchup;
  startGame: () => void;
  playGame: () => void;
  onGameFinished: () => void;
}) => {
  const showNewGameButton = !matchup.gameInProgress;
  const showWaitingOnPlayers =
    matchup.gameInProgress &&
    matchup.gameInProgress.status !== GAME_STATUS.Finished;
  const gameReadyToPlay =
    matchup.gameInProgress &&
    matchup.gameInProgress.status === GAME_STATUS.ReadyToPlay;

  const gameFinished =
    matchup.gameInProgress &&
    matchup.gameInProgress.status === GAME_STATUS.Finished;

  return (
    <Container>
      {showNewGameButton && <Button onClick={startGame}>Start a game</Button>}
      {showWaitingOnPlayers && (
        <GameWaitingOnPlayers moves={matchup.gameInProgress!.moves} />
      )}
      {gameReadyToPlay && (
        <Button className="radioactive" onClick={playGame}>
          PLAY!
        </Button>
      )}
      {gameFinished && (
        <GameResult
          game={matchup.gameInProgress!}
          gameViewFinished={onGameFinished}
        />
      )}
    </Container>
  );
};
