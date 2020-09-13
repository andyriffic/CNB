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
import { GamePhase, useGamePhaseTiming } from './useGamePhaseTiming';

const GameplayArea = styled.div`
  position: relative;
  border: 1px solid #000;
  height: 70%;
  margin: 0 auto;
`;

type Props = {
  game: Game;
  bonusPoints: number;
};

const timebombPositions: [RelativePosition, RelativePosition] = [
  { bottom: 0, left: 10 },
  { bottom: 0, left: 85 },
];

const winnerPositions: [RelativePosition, RelativePosition] = [
  { top: 10, left: 10 },
  { top: 10, left: 85 },
];

const pointsPositions: {
  game: RelativePosition;
  bonus: RelativePosition;
  player: [RelativePosition, RelativePosition];
} = {
  game: { top: 30, left: 48 },
  bonus: { top: 5, left: 48 },
  player: [{ top: 70, left: 0 }, { top: 70, left: 93 }],
};

const View = ({ game, bonusPoints }: Props) => {
  const gamePhase = useGamePhaseTiming(game);
  const [gamePointsPosition, setGamePointsPosition] = useState(
    pointsPositions.game
  );

  const [playerPoints, setPlayerPoints] = useState<[number, number]>([1, 1]);

  useEffect(() => {
    if (!game.result) {
      setGamePointsPosition(pointsPositions.game);
      return;
    }

    if (gamePhase === GamePhase.givePointsToPlayer) {
      if (game.result.winnerIndex !== undefined) {
        setGamePointsPosition(pointsPositions.player[game.result.winnerIndex]);
      }
    } else if (gamePhase === GamePhase.givePointsToBonus) {
      setGamePointsPosition(pointsPositions.bonus);
    }
  }, [game, gamePhase]);

  // useEffect(() => {
  //   setMoveReady(!!game.result);
  // }, [game.result]);

  return (
    <GameScreen scrollable={false}>
      <p>{gamePhase}</p>
      <GameplayArea>
        {gamePhase === GamePhase.readyToPlay && (
          <SplashText
            onComplete={() => {
              /*setGamePhase(GamePhase.showResult)*/
            }}
          >
            Ready
          </SplashText>
        )}

        {/* Players */}
        <PositionedArea position={{ bottom: 15, left: 0 }}>
          <GamePlayer
            imageUrl={game.moves[0].playerAvatarUrl}
            poweredUp={game.moves[0].usedPowerup}
          />
        </PositionedArea>
        <PositionedArea position={{ bottom: 15, right: 0 }}>
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
            revealed={[
              GamePhase.showResult,
              GamePhase.highlightWinner,
              GamePhase.highlightDraw,
              GamePhase.showPoints,
              GamePhase.givePointsToPlayer,
              GamePhase.givePointsToBonus,
              GamePhase.timebombFuse,
              GamePhase.timebombResolution,
            ].includes(gamePhase)}
          />
        </PositionedArea>
        <PositionedArea position={{ bottom: 25, right: 30 }}>
          <PlayerMove
            moved={game.moves[1].moved}
            moveId={game.result && game.result.moves[1].moveId}
            revealed={[
              GamePhase.showResult,
              GamePhase.highlightWinner,
              GamePhase.highlightDraw,
              GamePhase.showPoints,
              GamePhase.givePointsToPlayer,
              GamePhase.givePointsToBonus,
              GamePhase.timebombFuse,
              GamePhase.timebombResolution,
            ].includes(gamePhase)}
          />
        </PositionedArea>

        {/* Powerups */}
        <PositionedArea position={{ bottom: 45, left: 8 }}>
          <PlayerPowerup powerupUsed={game.moves[0].usedPowerup} />
        </PositionedArea>
        <PositionedArea position={{ bottom: 45, right: 8 }}>
          <PlayerPowerup powerupUsed={game.moves[1].usedPowerup} />
        </PositionedArea>

        {/* Points */}
        {[
          GamePhase.showPoints,
          GamePhase.givePointsToPlayer,
          GamePhase.givePointsToBonus,
        ].includes(gamePhase) && (
          <PositionedArea
            position={gamePointsPosition}
            onMoveComplete={() => {
              setPlayerPoints([2, 1]);
            }}
          >
            <Points title="" value={1} />
          </PositionedArea>
        )}
        <PositionedArea position={pointsPositions.bonus}>
          <Points title="Bonus" value={bonusPoints} />
        </PositionedArea>
        <PositionedArea position={pointsPositions.player[0]}>
          <Points title="Points" value={playerPoints[0]} />
        </PositionedArea>
        <PositionedArea position={pointsPositions.player[1]}>
          <Points title="Points" value={playerPoints[1]} />
        </PositionedArea>

        {/* Winner */}
        {[
          GamePhase.highlightWinner,
          GamePhase.highlightDraw,
          GamePhase.showPoints,
          GamePhase.givePointsToPlayer,
          GamePhase.givePointsToBonus,
          GamePhase.timebombFuse,
          GamePhase.timebombResolution,
        ].includes(gamePhase) && (
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
                draw
              </PositionedArea>
            )}
          </>
        )}

        {/* Timebomb */}
        <PositionedArea
          position={timebombPositions[game.attributes.playerHoldingBombIndex]}
        >
          <Timebomb
            triggerFuse={gamePhase === GamePhase.timebombFuse}
            triggerExplosion={
              gamePhase === GamePhase.timebombResolution &&
              !!game.attributes.exploded
            }
          />
        </PositionedArea>
      </GameplayArea>
    </GameScreen>
  );
};

export default View;
