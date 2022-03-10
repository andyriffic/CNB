import React, { useState, useContext, useEffect } from 'react';
import { usePlayer } from './hooks/usePlayer';
import { GameScreen } from '../../components/ui/GameScreen';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { PlayerSettings } from './components/PlayerSettings';
import { SecondaryButton } from '../../../uplift/components/SecondaryButton';
import { usePlayerGasGame } from './hooks/usePlayerGasGame';
import { PlayerGasCards } from './components/PlayerGasCards';
import { PlayerGasCloudPresser } from './components/PlayerGasCloudPresser';
import styled from 'styled-components';
import { SelectBonusChoice } from './components/SelectBonusChoice';
import { RainbowText } from '../../../uplift/components/RainbowText';
import { getOrdinal } from '../../../uplift/utils/ordinal';
import { PlayerGasNextOutSelector } from './components/PlayerGasNextOutSelector';
import { PlayerGasChosenNextOutPlayer } from './components/PlayerGasChosenNextOutPlayer';
import { PlayerGasTimeoutTimer } from './components/PlayerGasTimeoutTimer';

const PlayerStatus = styled.div`
  margin: 30px 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.large};
  font-family: ${({ theme }) => theme.fontFamily.feature};
`;

const PlayerFinishedPosition = styled.div`
  margin: 30px 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.large};
  font-family: ${({ theme }) => theme.fontFamily.feature};
`;

type Props = {
  playerId: string;
  gasGameId: string;
};

export const PlayGasView = ({ playerId, gasGameId }: Props) => {
  const {
    game,
    gasPlayer,
    playersTurn,
    playPlayersCard,
    pressesRemaining,
    pressCloud,
    statusText,
    guessNextPlayerOut,
    timeOut,
  } = usePlayerGasGame(playerId, gasGameId);

  if (!(gasPlayer && game)) {
    return (
      <>
        <LoadingSpinner text="Loading..." />
        <div style={{ textAlign: 'center' }}>
          <SecondaryButton
            onClick={() => (window.location.href = `/play/${playerId}`)}
          >
            Back to your games list
          </SecondaryButton>
        </div>
      </>
    );
  }

  const showCloudPresser = playersTurn && pressesRemaining > 0;

  return (
    <GameScreen scrollable={true} showGameSettings={false}>
      {gasPlayer && <SelectBonusChoice playerId={gasPlayer.player.id} />}

      <PlayerStatus>{statusText}</PlayerStatus>
      {!showCloudPresser && gasPlayer.status === 'alive' && (
        <>
          <PlayerGasCards
            cards={gasPlayer.cards}
            enabled={playersTurn && !game.currentPlayer.cardPlayed}
            playCard={playPlayersCard}
          />
          {playersTurn && !game.currentPlayer.cardPlayed && (
            <PlayerGasTimeoutTimer onTimedOut={timeOut} />
          )}
        </>
      )}
      {showCloudPresser && gasPlayer.status === 'alive' && (
        <PlayerGasCloudPresser
          pressesRemaining={pressesRemaining}
          press={pressCloud}
        />
      )}
      {!!gasPlayer.finishedPosition && (
        <PlayerFinishedPosition>
          <RainbowText>
            <>{getOrdinal(gasPlayer.finishedPosition)}</>
          </RainbowText>
        </PlayerFinishedPosition>
      )}
      {!gasPlayer.guesses.nextPlayerOutGuess &&
        !game.winningPlayerId &&
        gasPlayer.status === 'dead' && (
          <PlayerGasNextOutSelector
            eligiblePlayers={game.allPlayers.filter(p => p.status === 'alive')}
            selectPlayer={guessNextPlayerOut}
          />
        )}
      {gasPlayer.guesses.nextPlayerOutGuess && (
        <PlayerGasChosenNextOutPlayer
          allPlayers={game.allPlayers}
          selectedPlayerId={gasPlayer.guesses.nextPlayerOutGuess}
        />
      )}
      <PlayerSettings player={gasPlayer.player} />
    </GameScreen>
  );
};
