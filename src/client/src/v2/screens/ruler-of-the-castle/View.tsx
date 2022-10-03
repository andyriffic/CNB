import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { FinalEpicMatchup } from '../../components/FinalEpicMatchup';
import { SplashText } from '../../components/SplashText';
import { GameScreen } from '../../components/ui/GameScreen';
import { useSyncData } from '../pac-man/hooks/useSyncData';
import { Points } from '../spectator/components/Points';
import { Battle } from './Battle';
import backgroundImage from './castle-background.jpg';
import { CastleUiPlayer } from './CastleUiPlayer';
import { useCastleSound } from './useCastleSound';
import { useCastleState } from './useCastleState';
import { useCastleSyncState } from './useCastleSyncState';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Background = styled.div`
  background-size: cover;
  width: 1536px;
  height: 854px;
  background-image: url(${backgroundImage});
  overflow: hidden; /* change to hidden once debugging done */
  position: relative;
`;

const View = () => {
  const [showBattleStarter, setShowBattleStarter] = useState(false);
  const [showAnimations, setShowAnimations] = useState(false);
  const castleState = useCastleState();
  const [points, setPoints] = useState(0);
  useCastleSound(castleState, points, showAnimations);
  useCastleSyncState(castleState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        castleState.attackingPlayer &&
        castleState.defendingPlayer &&
        !castleState.attackingPlayer.battleWinner &&
        !castleState.defendingPlayer.battleWinner
      ) {
        //No winner yet
        setShowBattleStarter(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [castleState]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAnimations(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPoints(1);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [points]);

  return (
    <GameScreen widthPercent={90}>
      <Container>
        <Background>
          {!castleState.outcome && castleState.attackingPlayer && (
            <CastleUiPlayer
              castlePlayer={castleState.attackingPlayer}
              castleState={castleState}
              movement={
                !castleState.attackingPlayer.battleWinner ? 'arrive' : undefined
              }
            />
          )}

          {castleState.outcome && castleState.attackingPlayer && (
            <CastleUiPlayer
              castlePlayer={castleState.attackingPlayer}
              castleState={castleState}
              movement={
                !showAnimations
                  ? undefined
                  : castleState.attackingPlayer.battleWinner
                  ? 'enter-castle'
                  : undefined
              }
            />
          )}
          {castleState.defendingPlayer && (
            <CastleUiPlayer
              castlePlayer={castleState.defendingPlayer}
              castleState={castleState}
              movement={
                !showAnimations
                  ? undefined
                  : castleState.outcome &&
                    !castleState.defendingPlayer.battleWinner
                  ? 'leave-castle'
                  : undefined
              }
            />
          )}
        </Background>
        {!castleState.outcome &&
          castleState.attackingPlayer &&
          !castleState.attackingPlayer.battleWinner &&
          castleState.attackingPlayer.player && (
            <SplashText>
              {castleState.attackingPlayer.player.name} approaches!
            </SplashText>
          )}
        {castleState.outcome &&
          castleState.defendingPlayer &&
          castleState.defendingPlayer.battleWinner &&
          castleState.defendingPlayer.player && (
            <SplashText>
              {castleState.defendingPlayer.player.name} keeps the castle!
            </SplashText>
          )}
        {castleState.outcome &&
          castleState.attackingPlayer &&
          castleState.attackingPlayer.battleWinner &&
          castleState.attackingPlayer.player && (
            <SplashText>
              {castleState.attackingPlayer.player.name} storms the castle!
            </SplashText>
          )}
        {castleState.outcome &&
          castleState.defendingPlayer &&
          castleState.defendingPlayer.battleWinner && (
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '65%',
              }}
            >
              <Points value={points} />
            </div>
          )}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate3d(-50%. -50%, 0)',
          }}
        >
          {showBattleStarter &&
            castleState.attackingPlayer &&
            castleState.attackingPlayer.player &&
            castleState.defendingPlayer &&
            castleState.defendingPlayer.player && (
              <Battle
                attackingPlayerId={castleState.attackingPlayer.player.id}
                defendingPlayerId={castleState.defendingPlayer.player.id}
              />
            )}
        </div>
      </Container>
    </GameScreen>
  );
};

export default View;
