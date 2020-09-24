import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GameScreen } from '../../components/ui/GameScreen';
import { Game } from '../../../uplift/contexts/MatchupProvider';
import { GamePlayer } from './GamePlayer';
import { PlayerMove } from './PlayerMove';
import { PlayerPowerup } from './PlayerPowerup';
import { Points } from './Points';
import { useSpring, animated, config } from 'react-spring';
import { Timebomb } from './Timebomb';
import { SplashText } from '../../../uplift/components/SplashText';
import { Winner } from './Winner';
import { RelativePosition, PositionedArea } from './PositionedArea';
import { GamePhase } from './hooks/useGamePhaseTiming';
import { TimebombTimedState } from './hooks/useTimedGameState';
import { PrimaryButton } from '../../../uplift/components/PrimaryButton';
import {
  pointsPositions,
  usePositionedBonusPoints,
  usePositionedGamePoints,
} from './hooks/usePositionedPoints';
import { usePositionedTimebomb } from './hooks/usePositionedTimebomb';
import { Draw } from './Draw';
import gameAreaBackgroundImage from './assets/game-area-background.jpg';

const GameplayArea = styled.div`
  position: relative;
  /* border: 1px solid #000; */
  height: 70%;
  margin: 0 auto;
  /* background: transparent url(${gameAreaBackgroundImage}) no-repeat 0px -100px;
  background-size: cover;
  box-shadow: 5px 10px #888888; */
`;

type Props = {
  game: Game;
  bonusPoints: number;
  gamePhase: GamePhase;
  playerPoints: [number, number];
  timebomb: TimebombTimedState;
  pointsThisGame: number;
};

const winnerPositions: [RelativePosition, RelativePosition] = [
  { top: 10, left: 10 },
  { top: 10, left: 85 },
];

const View = ({
  game,
  bonusPoints,
  gamePhase,
  playerPoints,
  timebomb,
  pointsThisGame,
}: Props) => {
  const gamePointsPosition = usePositionedGamePoints(gamePhase, game);
  const bonusPointsPosition = usePositionedBonusPoints(gamePhase);
  const timebombPosition = usePositionedTimebomb(timebomb);

  return (
    <GameScreen scrollable={false}>
      {/* <p>{GamePhase[gamePhase]}</p> */}
      <GameplayArea>
        {/* Players */}
        <PositionedArea position={{ bottom: 15, left: 0 }}>
          <GamePlayer
            imageUrl={game.moves[0].playerAvatarUrl}
            poweredUp={game.moves[0].usedPowerup}
          />
        </PositionedArea>
        <PositionedArea position={{ bottom: 15, right: 0 }} flipX={true}>
          <GamePlayer
            imageUrl={game.moves[1].playerAvatarUrl}
            poweredUp={game.moves[1].usedPowerup}
          />
        </PositionedArea>

        {/* Moves */}
        <PositionedArea position={{ bottom: 25, left: 30 }}>
          <PlayerMove
            moved={game.moves[0].moved}
            moveId={game.result && game.result.moves[0].moveId}
            revealed={gamePhase >= GamePhase.showResult}
          />
        </PositionedArea>
        <PositionedArea position={{ bottom: 25, right: 30 }} flipX={true}>
          <PlayerMove
            moved={game.moves[1].moved}
            moveId={game.result && game.result.moves[1].moveId}
            revealed={gamePhase >= GamePhase.showResult}
          />
        </PositionedArea>

        {/* Powerups */}
        <PositionedArea position={{ bottom: 60, left: 0 }}>
          <PlayerPowerup
            powerupUsed={game.moves[0].usedPowerup}
            powerupId={game.result && game.result.moves[0].powerUpId}
            reveal={gamePhase >= GamePhase.highlightWinner}
          />
        </PositionedArea>
        <PositionedArea position={{ bottom: 60, right: 0 }}>
          <PlayerPowerup
            powerupUsed={game.moves[1].usedPowerup}
            powerupId={game.result && game.result.moves[1].powerUpId}
            reveal={gamePhase >= GamePhase.highlightWinner}
          />
        </PositionedArea>

        {/* Points */}
        {pointsThisGame > 0 && (
          <PositionedArea position={gamePointsPosition}>
            <Points title="" value={pointsThisGame} variant="game" />
          </PositionedArea>
        )}
        {(bonusPoints > 0 ||
          [GamePhase.givePointsToBonus].includes(gamePhase)) && (
          <PositionedArea position={bonusPointsPosition}>
            <Points title="Bonus" value={bonusPoints} variant="bonus" />
          </PositionedArea>
        )}
        <PositionedArea position={pointsPositions.player[0]}>
          <Points title="Points" value={playerPoints[0]} variant="player" />
        </PositionedArea>
        <PositionedArea position={pointsPositions.player[1]}>
          <Points title="Points" value={playerPoints[1]} variant="player" />
        </PositionedArea>

        {/* Winner */}
        {gamePhase >= GamePhase.highlightWinner && (
          <>
            {game.result && !game.result.draw ? (
              <PositionedArea
                position={
                  winnerPositions[
                    (game.result &&
                      game.result.winnerIndex !== undefined &&
                      game.result.winnerIndex) ||
                      0
                  ]
                }
              >
                <Winner />
              </PositionedArea>
            ) : (
              <PositionedArea position={{ top: 45, left: 46 }}>
                <Draw />
              </PositionedArea>
            )}
          </>
        )}

        {/* Timebomb */}
        <PositionedArea position={timebombPosition}>
          <Timebomb
            intensity={game.attributes.gameCount}
            triggerFuse={gamePhase === GamePhase.timebombFuse}
            triggerExplosion={timebomb.exploded}
          />
        </PositionedArea>

        {gamePhase === GamePhase.readyToPlay && (
          <SplashText>Round {game.attributes.gameCount}</SplashText>
        )}

        {gamePhase === GamePhase.gameOver && <SplashText>Game over</SplashText>}
      </GameplayArea>
    </GameScreen>
  );
};

export default View;
