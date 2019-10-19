import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Matchup, GAME_STATUS } from '../../../contexts/MatchupProvider';
import { GameWaitingOnPlayers } from './GameWaitingOnPlayers';
import { GameResult } from './GameResult';
import { TimebombStrip } from './TimebombStrip';
import { PrimaryButton } from '../../../components/PrimaryButton';

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
  ] = useState<number | undefined>(
    matchup.gameInProgress &&
      matchup.gameInProgress.attributes.playerIndexHoldingTimebomb
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

  useEffect(() => {
    //Make sure timebomb is showing under the correct player at start of the game
    if (delayedTimebombPlayerHoldingIndex !== null) {
      return;
    }

    if (
      matchup.gameInProgress &&
      matchup.gameInProgress.attributes.playerIndexHoldingTimebomb !== null
    ) {
      setDelayedTimebombPlayerHoldingIndex(
        matchup.gameInProgress.attributes.playerIndexHoldingTimebomb
      );
    }
  }, [matchup, delayedTimebombPlayerHoldingIndex]);

  const gameplaySectionFinished = () => {
    if (
      matchup.gameInProgress &&
      matchup.gameInProgress.playMode === 'Timebomb'
    ) {
      setDelayedTimebombPlayerHoldingIndex(
        (matchup.gameInProgress &&
          matchup.gameInProgress.attributes.playerIndexHoldingTimebomb) ||
          0
      );
      setTimeout(() => {
        setRunTimebomb(true);
      }, 2000);
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
          <PrimaryButton onClick={() => startGame()}>Classic 😴</PrimaryButton>{' '}
          <PrimaryButton onClick={() => startGame('Timebomb')}>
            Timebomb 💣
          </PrimaryButton>
        </div>
      )}
      {showWaitingOnPlayers && (
        <GameWaitingOnPlayers moves={matchup.gameInProgress!.moves} />
      )}
      {gameReadyToPlay && (
        // Note that onClick actually calls the playGame function. Temporarily do that to auto-start next game and see how it goes!
        <PrimaryButton className="radioactive" onClick={playGame()}>
          PLAY!
        </PrimaryButton>
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
            playerWithTimebombIndex={delayedTimebombPlayerHoldingIndex || 0}
          />
        )}
    </Container>
  );
};
