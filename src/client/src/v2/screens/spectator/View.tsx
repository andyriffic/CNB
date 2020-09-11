import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FullPageScreenLayout } from '../../../uplift/components/layouts/FullPageScreenLayout';
import { MainHeading } from '../../../uplift/components/Heading';
import { RouteComponentProps } from '@reach/router';
import { PlayerAvatar } from '../../../uplift/components/PlayerAvatar';
import { Player } from '../../../uplift/contexts/PlayersProvider';
import { GameScreen } from '../../components/ui/GameScreen';
import { Game } from '../../../uplift/contexts/MatchupProvider';
import { GamePlayer } from './GamePlayer';
import { PlayerMove } from './PlayerMove';
import { PlayerPowerup } from './PlayerPowerup';
import { Points } from './Points';
import { useSpring, animated, config } from 'react-spring';
import { Timebomb } from './Timebomb';
import { SplashText } from '../../../uplift/components/SplashText';

/*
  introduce players
  assign bomb

  waiting player moves   <-----
  ready to play               |
  show result                 |
  highlight winner            |
  show points                 |
  apply bonus points          |
  apply powerups              |
  update points to player     |
  timebomb                    |
  no explosion ----------------

  explode
  game summary

 */

enum GamePhase {
  waitingMoves = 'waitingMoves',
  readyToPlay = 'readyToPlay',
  showResult = 'showResult',
  highlightWinner = 'highlightWinner',
}

const useGameTiming = (
  gamePhase: GamePhase,
  setGamePhase: (gamePhase: GamePhase) => void,
  {
    from,
    to,
    timeoutMilliseconds,
  }: { from: GamePhase; to: GamePhase; timeoutMilliseconds: number }
) => {
  useEffect(() => {
    if (gamePhase === from) {
      setTimeout(() => {
        setGamePhase(to);
      }, timeoutMilliseconds);
    }
  }, [gamePhase]);
};

const useGamePhase = (game: Game) => {
  const [gamePhase, setGamePhase] = useState(GamePhase.waitingMoves);

  // useEffect(() => {
  //   if (gamePhase !== GamePhase.waitingMoves) {
  //     return;
  //   }

  //   if (!!game.result) {
  //     setGamePhase(GamePhase.readyToPlay);
  //   }
  // }, [game, gamePhase]);

  useEffect(() => {
    console.log('useGamePhase', game);

    if (!game.result) {
      setGamePhase(GamePhase.waitingMoves);
    } else {
      setGamePhase(GamePhase.readyToPlay);
    }
  }, [game]);

  // useGameTiming(gamePhase, setGamePhase, {
  //   from: GamePhase.readyToPlay,
  //   to: GamePhase.showResult,
  //   timeoutMilliseconds: 2000,
  // });

  return { gamePhase, setGamePhase };
};

const GameplayArea = styled.div`
  position: relative;
  border: 1px solid #000;
  height: 70%;
  margin: 0 auto;
`;

const PositionedPlayer1 = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const PositionedPlayer2 = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const PositionedPlayer1Move = styled.div`
  position: absolute;
  bottom: 15%;
  left: 30%;
`;

const PositionedPlayer2Move = styled.div`
  position: absolute;
  bottom: 15%;
  right: 30%;
`;

const PositionedPlayer1Powerup = styled.div`
  position: absolute;
  bottom: 45%;
  left: 8%;
`;

const PositionedPlayer2Powerup = styled.div`
  position: absolute;
  bottom: 45%;
  right: 8%;
`;

const PositionedPlayer1Points = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const PositionedPlayer2Points = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const PositionedBonusPoints = styled.div`
  position: absolute;
  top: 5%;
  left: 48%;
`;

const PositionedTimebomb = styled.div`
  position: absolute;
  top: 30%;
  left: 48%;
`;

type Props = {
  game: Game;
};

const View = ({ game }: Props) => {
  const { gamePhase, setGamePhase } = useGamePhase(game);

  // useEffect(() => {
  //   setMoveReady(!!game.result);
  // }, [game.result]);

  return (
    <GameScreen scrollable={false}>
      {/* <p>{gamePhase}</p> */}
      <GameplayArea>
        {gamePhase === GamePhase.readyToPlay && (
          <SplashText onComplete={() => setGamePhase(GamePhase.showResult)}>
            Ready
          </SplashText>
        )}

        {/* Players */}
        <PositionedPlayer1>
          <GamePlayer
            imageUrl={game.moves[0].playerAvatarUrl}
            poweredUp={game.moves[0].usedPowerup}
          />
        </PositionedPlayer1>
        <PositionedPlayer2>
          <GamePlayer
            imageUrl={game.moves[1].playerAvatarUrl}
            poweredUp={game.moves[1].usedPowerup}
          />
        </PositionedPlayer2>

        {/* Moves */}
        <PositionedPlayer1Move>
          <PlayerMove
            moveId={game.result && game.result.moves[0].moveId}
            revealed={[
              GamePhase.showResult,
              GamePhase.highlightWinner,
            ].includes(gamePhase)}
            onComplete={() => setGamePhase(GamePhase.highlightWinner)}
          />
        </PositionedPlayer1Move>
        <PositionedPlayer2Move>
          <PlayerMove
            moveId={game.result && game.result.moves[1].moveId}
            revealed={[
              GamePhase.showResult,
              GamePhase.highlightWinner,
            ].includes(gamePhase)}
          />
        </PositionedPlayer2Move>

        {/* Powerups */}
        <PositionedPlayer1Powerup>
          <PlayerPowerup powerupUsed={game.moves[0].usedPowerup} />
        </PositionedPlayer1Powerup>
        <PositionedPlayer2Powerup>
          <PlayerPowerup powerupUsed={game.moves[1].usedPowerup} />
        </PositionedPlayer2Powerup>

        {/* Points */}
        <PositionedBonusPoints>
          <Points title="Bonus" value={20} />
        </PositionedBonusPoints>
        <PositionedPlayer1Points>
          <Points title="Points" value={1} />
        </PositionedPlayer1Points>
        <PositionedPlayer2Points>
          <Points title="Points" value={1} />
        </PositionedPlayer2Points>
      </GameplayArea>

      {/* Timebomb */}
      <PositionedTimebomb>
        <Timebomb />
      </PositionedTimebomb>
    </GameScreen>
  );
};

export default View;
