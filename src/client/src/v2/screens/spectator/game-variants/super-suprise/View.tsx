import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GameScreen } from '../../../../components/ui/GameScreen';
import { Game } from '../../../../providers/MatchupProvider';
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
import { SelectSuprise } from './components/SelectSuprise';
import { useLuckyZodiac } from '../../hooks/useLuckyZodiac';
import { SOCKETS_ENDPOINT } from '../../../../../environment';

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
  setGamePhase: React.Dispatch<React.SetStateAction<GamePhase>>;
  triggerUpdate: () => void;
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
  pointsThisGame,
  setGamePhase,
  triggerUpdate,
}: Props) => {
  const gamePointsPosition = usePositionedGamePoints(gamePhase, game);
  const bonusPointsPosition = usePositionedBonusPoints(gamePhase);
  const [showGameOverAction, setShowGameOverAction] = useState(false);
  const { luckySign, giveLuckyZodiacPoints } = useLuckyZodiac();

  return (
    <GameScreen scrollable={false}>
      {/* <p>{GamePhase[gamePhase]}</p> */}
      {gamePhase === GamePhase.selectSuprise &&
        game.result &&
        game.result.winnerIndex !== undefined && (
          <SelectSuprise
            playerId={game.moves[game.result.winnerIndex].playerId!}
            gameCount={game.attributes.gameCount}
            onComplete={gameOver => {
              triggerUpdate();
              setGamePhase(
                gameOver ? GamePhase.gameOver : GamePhase.readyForNextGame
              );
            }}
          />
        )}
      <GameplayArea>
        {/* Players */}
        <PositionedArea position={{ bottom: 15, left: 0 }}>
          <GamePlayer
            imageUrl={game.moves[0].playerAvatarUrl}
            poweredUp={game.moves[0].usedPowerup}
            tags={game.moves[0].tags}
          />
        </PositionedArea>
        <PositionedArea position={{ bottom: 15, right: 0 }} flipX={true}>
          <GamePlayer
            imageUrl={game.moves[1].playerAvatarUrl}
            poweredUp={game.moves[1].usedPowerup}
            tags={game.moves[1].tags}
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

        {gamePhase === GamePhase.readyToPlay && (
          <SplashText>Round {game.attributes.gameCount}</SplashText>
        )}

        {gamePhase === GamePhase.gameOver && (
          <SplashText
            onComplete={() => {
              giveLuckyZodiacPoints();
              setShowGameOverAction(true);
            }}
          >
            Game over
          </SplashText>
        )}
        {showGameOverAction && (
          <PositionedArea position={{ left: 40, bottom: 0 }}>
            <FancyLink href="/snakes-and-ladders">
              🐍 To Snakes and Ladders
            </FancyLink>
          </PositionedArea>
        )}
      </GameplayArea>
      <PositionedArea position={{ left: 40, top: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          LUCKY SIGN:{' '}
          <img
            style={{ width: '50px', height: '50px' }}
            src={`${SOCKETS_ENDPOINT}/zodiac/disc/${luckySign}.png`}
          />
        </div>
      </PositionedArea>
    </GameScreen>
  );
};

export default View;
