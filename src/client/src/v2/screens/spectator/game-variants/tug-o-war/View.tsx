import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GameScreen } from '../../../../components/ui/GameScreen';
import { Game, GameResult } from '../../../../providers/MatchupProvider';
import { GamePlayer } from '../../components/GamePlayer';
import { PlayerMove } from '../../components/PlayerMove';
import { PlayerPowerup } from '../../components/PlayerPowerup';
import { Points } from '../../components/Points';
import { SplashText } from '../../../../components/SplashText';
import { Winner } from '../../components/Winner';
import {
  RelativePosition,
  PositionedArea,
} from '../../../../components/PositionedArea';
import { GamePhase } from '../../hooks/useGamePhaseTiming';
import {
  pointsPositions,
  usePositionedBonusPoints,
  usePositionedGamePoints,
} from '../../hooks/usePositionedPoints';
import { Draw } from '../../components/Draw';
import { FancyLink } from '../../../../../components/FancyLink';
import { usePositionedPlayers } from './hooks/usePositionedPlayers';
import { TugAnimation } from './components/TugAnimation';
import { Rope } from './components/Rope';
import { CliffEdge } from './components/CliffEdge';

const GameplayArea = styled.div`
  position: relative;
  /* border: 1px solid #000; */
  height: 70%;
  margin: 0 auto;
`;

type Props = {
  game: Game;
  bonusPoints: number;
  gamePhase: GamePhase;
  playerPoints: [number, number];
  pointsThisGame: number;
};

const winnerPositions: [RelativePosition, RelativePosition] = [
  { top: 10, left: 10 },
  { top: 10, left: 85 },
];

const getTugDirection = (
  playerIndex: number,
  gameResult: GameResult | undefined
): 'left' | 'right' => {
  if (!gameResult) {
    return 'left';
  }

  if (gameResult.draw) {
    return playerIndex === 0 ? 'left' : 'right';
  }

  return gameResult.winnerIndex === 0 ? 'left' : 'right';
};

const View = ({
  game,
  bonusPoints,
  gamePhase,
  playerPoints,
  pointsThisGame,
}: Props) => {
  const gamePointsPosition = usePositionedGamePoints(gamePhase, game);
  const bonusPointsPosition = usePositionedBonusPoints(gamePhase);
  const [showGameOverAction, setShowGameOverAction] = useState(false);
  const [player1Position, player2Position] = usePositionedPlayers(
    gamePhase,
    game
  );

  return (
    <GameScreen scrollable={false}>
      {/* <p>{JSON.stringify(game.attributes)}</p>
      <p>{GamePhase[gamePhase]}</p> */}
      <GameplayArea>
        {/* Cliffs */}
        <div
          style={{
            position: 'absolute',
            bottom: '-330px',
            left: 0,
            transform: 'scaleX(-1)',
          }}
        >
          <CliffEdge />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '-330px',
            right: 0,
          }}
        >
          <CliffEdge />
        </div>

        {/* Rope */}
        <PositionedArea position={{ bottom: 25, left: 10 }}>
          <Rope />
        </PositionedArea>

        {/* Players */}
        <PositionedArea position={player1Position}>
          <TugAnimation
            fall={
              gamePhase >= GamePhase.tugoWarPlayerFalls &&
              game.attributes.playerPositions[0] === 0
            }
            tugging={gamePhase === GamePhase.tugoWarYankPlayer}
            direction={getTugDirection(0, game.result)}
          >
            <GamePlayer
              imageUrl={game.moves[0].playerAvatarUrl}
              poweredUp={game.moves[0].usedPowerup}
            />
          </TugAnimation>
        </PositionedArea>
        <PositionedArea position={player2Position}>
          <TugAnimation
            fall={
              gamePhase >= GamePhase.tugoWarPlayerFalls &&
              game.attributes.playerPositions[1] === 0
            }
            tugging={gamePhase === GamePhase.tugoWarYankPlayer}
            direction={getTugDirection(1, game.result)}
          >
            <GamePlayer
              imageUrl={game.moves[1].playerAvatarUrl}
              poweredUp={game.moves[1].usedPowerup}
              flipX={true}
            />
          </TugAnimation>
        </PositionedArea>

        {/* Moves */}
        <PositionedArea position={{ top: 10, left: 30 }}>
          <PlayerMove
            moved={game.moves[0].moved}
            moveId={game.result && game.result.moves[0].moveId}
            revealed={gamePhase >= GamePhase.showResult}
          />
        </PositionedArea>
        <PositionedArea position={{ top: 10, right: 30 }} flipX={true}>
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

        {gamePhase === GamePhase.readyToPlay && (
          <SplashText>Round {game.attributes.gameCount}</SplashText>
        )}

        {gamePhase === GamePhase.gameOver && (
          <SplashText onComplete={() => setShowGameOverAction(true)}>
            Game over
          </SplashText>
        )}
        {showGameOverAction && (
          <PositionedArea position={{ left: 40, bottom: 0 }}>
            <FancyLink href="/v2/snakes-and-ladders">
              🐍 To Snakes and Ladders
            </FancyLink>
          </PositionedArea>
        )}
      </GameplayArea>
    </GameScreen>
  );
};

export default View;
