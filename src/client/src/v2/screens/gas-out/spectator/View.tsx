import { NavigateFn } from '@reach/router';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import { jackInTheBoxAnimation } from '../../../../uplift/components/animations';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { SplashText } from '../../../components/SplashText';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useGasProvider } from '../../../providers/GasProvider';
import { GasCloud } from './GasCloud';
import { GasPlayerDebug } from './GasPlayerDebug';
import { useGasGame } from './hooks/useGasGame';
import { useGasSound } from './hooks/useGasSound';
import { PlayerList } from './PlayerList';

const Container = styled.div`
  margin: 50px auto 50px auto;
`;

const PlayersContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DonkeyKongLinkContainer = styled.div`
  text-align: center;
  cursor: pointer;
  animation: ${jackInTheBoxAnimation} 2000ms linear 4000ms both;
`;

type Props = {
  gameId: string;
  navigate: NavigateFn | undefined;
};

export default ({ gameId, navigate }: Props) => {
  const { game } = useGasGame(gameId);
  useGasSound(game);
  const { nextPlayer } = useGasProvider();
  const nextPlayerForThisGame = useCallback(() => game && nextPlayer(game.id), [
    game,
  ]);

  useEffect(() => {
    if (!game) {
      return;
    }
    if (!!game.winningPlayerId) {
      return;
    }

    if (
      (game.currentPlayer.cardPlayed &&
        game.currentPlayer.pressesRemaining === 0) ||
      game.gasCloud.exploded
    ) {
      const timer = setTimeout(nextPlayerForThisGame, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [game, nextPlayerForThisGame]);

  if (!game) {
    return <LoadingSpinner />;
  }

  return (
    <GameScreen scrollable={true}>
      <Container>
        {isPersistantFeatureEnabled('cnb-debug') && (
          <GasPlayerDebug game={game} />
        )}
        <PlayersContainer>
          <PlayerList
            players={game.allPlayers}
            currentPlayerId={game.currentPlayer.id}
            currentCard={game.currentPlayer.cardPlayed}
            gameOver={!!game.winningPlayerId}
            winningPlayerId={game.winningPlayerId}
          />
        </PlayersContainer>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GasCloud game={game} />
        </div>
      </Container>
      {/* {mobGame.gameOver && mobGame.roundState === 'viewed' && (
        <DonkeyKongLinkContainer>
          <FancyLink onClick={() => (window.location.href = '/race-track')}>
            🏁 To the Race Track! 🏎
          </FancyLink>
        </DonkeyKongLinkContainer>
      )} */}
    </GameScreen>
  );
};
