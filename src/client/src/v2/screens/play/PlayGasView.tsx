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

const PlayerStatus = styled.div`
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
        <PlayerGasCards
          cards={gasPlayer.cards}
          enabled={playersTurn && !game.currentPlayer.cardPlayed}
          playCard={playPlayersCard}
        />
      )}
      {showCloudPresser && gasPlayer.status === 'alive' && (
        <PlayerGasCloudPresser
          pressesRemaining={pressesRemaining}
          press={pressCloud}
        />
      )}
      <PlayerSettings player={gasPlayer.player} />
    </GameScreen>
  );
};
