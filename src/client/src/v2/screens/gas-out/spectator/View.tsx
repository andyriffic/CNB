import { NavigateFn } from '@reach/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import { jackInTheBoxAnimation } from '../../../../uplift/components/animations';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { SplashText } from '../../../components/SplashText';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useGasProvider } from '../../../providers/GasProvider';
import { useMobGame } from '../../../providers/hooks/useMobGame';
import {
  MobGame,
  MobPlayer,
  useMobProvider,
} from '../../../providers/MobProvider';
import { CurrentCard } from './CurrentCard';
import { GasCloud } from './GasCloud';
import { GasPlayerDebug } from './GasPlayerDebug';
import { useGasGame } from './hooks/useGasGame';
import { PlayerList } from './PlayerList';

const Container = styled.div`
  margin: 50px auto 50px auto;
`;

const PlayersContainer = styled.div`
  display: flex;
`;
const MugContainer = styled.div`
  margin-right: 100px;
`;
const MobContainer = styled.div``;

const GraveyardContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
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
  const { nextPlayer } = useGasProvider();
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
          />
        </PlayersContainer>
        <CurrentCard card={game.currentPlayer.cardPlayed} />
        <GasCloud game={game} />
        {game.currentPlayer.cardPlayed &&
          game.currentPlayer.pressesRemaining === 0 && (
            <Button onClick={() => nextPlayer(game.id)}>Next Player</Button>
          )}
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
