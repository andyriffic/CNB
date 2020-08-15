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
import { useSpring, animated, config } from 'react-spring';

const GameplayArea = styled.div`
  position: relative;
  border: 1px solid #000;
  width: 75vw;
  height: 75vh;
  margin: 0 auto;
`;

const PositionedPlayer = styled.div`
  position: absolute;
`;

const PositionedPlayer1 = styled(PositionedPlayer)`
  bottom: 0;
  left: 0;
`;

const PositionedPlayer2 = styled(PositionedPlayer)`
  bottom: 0;
  right: 0;
`;

const PositionedPlayerMove = styled.div`
  position: absolute;
`;

const PositionedPlayer1Move = styled(PositionedPlayerMove)``;

const PositionedPlayer2Move = styled(PositionedPlayerMove)`
  bottom: 10%;
  right: 0;
`;

const PositionedPlayerPowerup = styled.div`
  position: absolute;
`;

const PositionedPlayer1Powerup = styled(PositionedPlayerPowerup)`
  bottom: 45%;
  left: 8%;
`;

const PositionedPlayer2Powerup = styled(PositionedPlayerPowerup)`
  bottom: 45%;
  right: 8%;
`;

type Props = {
  game: Game;
};

const AnimatedPosition = ({
  top = 0,
  children,
}: {
  top?: number;
  children: React.ReactNode;
}) => {
  const initialPlacement = useRef({ top });

  const props = useSpring({
    top: initialPlacement.current.top,
    to: {
      top,
    },
    config: config.wobbly,
  });

  return (
    <animated.div
      style={{
        position: 'absolute',
        top: props.top.interpolate(y => `${y * 10}px`),
      }}
    >
      {children}
    </animated.div>
  );
};

const View = ({ game }: Props) => {
  const [moveReady, setMoveReady] = useState(false);

  // useEffect(() => {
  //   setMoveReady(!!game.result);
  // }, [game.result]);

  return (
    <GameScreen scrollable={false}>
      <GameplayArea>
        {/* Players */}
        <PositionedPlayer1 onClick={() => setMoveReady(!moveReady)}>
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
        <AnimatedPosition top={moveReady ? 40 : 10}>
          <PlayerMove moveId={game.result && game.result.moves[0].moveId} />
        </AnimatedPosition>
        <PositionedPlayer2Move>
          <PlayerMove moveId={game.result && game.result.moves[1].moveId} />
        </PositionedPlayer2Move>

        {/* Powerups */}
        <PositionedPlayer1Powerup>
          <PlayerPowerup powerupUsed={game.moves[0].usedPowerup} />
        </PositionedPlayer1Powerup>
        <PositionedPlayer2Powerup>
          <PlayerPowerup powerupUsed={game.moves[1].usedPowerup} />
        </PositionedPlayer2Powerup>
      </GameplayArea>
    </GameScreen>
  );
};

export default View;
