import { NavigateFn } from '@reach/router';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { LinkToMiniGame } from '../../../components/LinkToMiniGame';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useGasProvider } from '../../../providers/GasProvider';
import { GameDirectionIndicator } from './GameDirectionIndicator';
import { GasBallon } from './GasBalloon';
import { GasPlayerDebug } from './GasPlayerDebug';
import { useGasGame } from './hooks/useGasGame';
import { useGasSound } from './hooks/useGasSound';
import { LastTwoPlayersNotification } from './LastTwoPlayersNotification';
import { PlayerList } from './PlayerList';
import { Winner } from './Winner';

const Container = styled.div`
  margin: 50px auto 50px auto;
`;

const PlayersContainer = styled.div`
  display: flex;
  justify-content: center;
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
      const timeout = game.gasCloud.exploded ? 1500 : 1000;
      const timer = setTimeout(nextPlayerForThisGame, timeout);

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
          <PlayerList game={game} gameOver={!!game.winningPlayerId} />
        </PlayersContainer>
        {!game.winningPlayerId && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <GameDirectionIndicator game={game} />
          </div>
        )}
        <Winner game={game} />
        {!!game.winningPlayerId && <LinkToMiniGame />}
        <LastTwoPlayersNotification game={game} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GasBallon gasCloud={game.gasCloud} />
        </div>
      </Container>
    </GameScreen>
  );
};
