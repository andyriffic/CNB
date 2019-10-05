import React, { useState } from 'react';
import styled from 'styled-components';
import { Matchup, GAME_STATUS } from '../../../contexts/MatchupProvider';
import { Button } from '../../../../screens/styled';
import { GameWaitingOnPlayers } from './GameWaitingOnPlayers';
import { GameResult } from './GameResult';
import { useDoOnce } from '../../../hooks/useDoOnce';
import { TimebombStrip } from './TimebombStrip';
import { isFeatureEnabled } from '../../../../featureToggle';

const Container = styled.div`
  text-align: center;
`;

export const GamePlaySection = ({
  matchup,
  startGame,
  playGame,
  onGameFinished,
  showTrophy,
}: {
  matchup: Matchup;
  startGame: (playMode?: string) => void;
  playGame: () => void;
  onGameFinished: () => void;
  showTrophy: boolean;
}) => {
  const [
    delayedTimebombPlayerHoldingIndex,
    setDelayedTimebombPlayerHoldingIndex,
  ] = useState(
    (matchup.gameInProgress &&
      matchup.gameInProgress.attributes.playerIndexHoldingTimebomb) ||
      0
  );
  const [runTimebomb, setRunTimebomb] = useState(false);
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

  const gameplaySectionFinished = () => {
    if (
      matchup.gameInProgress &&
      matchup.gameInProgress.playMode === 'Timebomb'
    ) {
      setRunTimebomb(true);
      setDelayedTimebombPlayerHoldingIndex(
        (matchup.gameInProgress &&
          matchup.gameInProgress.attributes.playerIndexHoldingTimebomb) ||
          0
      );
    } else {
      onGameFinished();
    }
  };

  const onTimebombFinished = () => {
    const noExplosion = !(
      matchup.gameInProgress && matchup.gameInProgress.attributes.exploded
    );
    if (noExplosion) {
      setRunTimebomb(false);
    }
    onGameFinished();
  };

  return (
    <Container>
      {showNewGameButton && (
        <div>
          <Button onClick={() => startGame()}>Classic Mode 😴</Button>{' '}
          <Button onClick={() => startGame('Timebomb')}>Timebomb 💣</Button>
        </div>
      )}
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
          showTrophy={showTrophy}
          gameViewFinished={gameplaySectionFinished}
        />
      )}
      {matchup.gameInProgress &&
        matchup.gameInProgress.playMode === 'Timebomb' && (
          <TimebombStrip
            run={runTimebomb}
            exploded={
              !!matchup.gameInProgress &&
              matchup.gameInProgress.attributes.exploded
            }
            intensity={
              (matchup.gameInProgress &&
                matchup.gameInProgress.attributes.gameCount) ||
              1
            }
            onComplete={onTimebombFinished}
            playerWithTimebombIndex={delayedTimebombPlayerHoldingIndex}
          />
        )}
    </Container>
  );
};
