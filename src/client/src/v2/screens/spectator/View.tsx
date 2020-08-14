import React from 'react';
import styled from 'styled-components';
import { FullPageScreenLayout } from '../../../uplift/components/layouts/FullPageScreenLayout';
import { MainHeading } from '../../../uplift/components/Heading';
import { RouteComponentProps } from '@reach/router';
import { PlayerAvatar } from '../../../uplift/components/PlayerAvatar';
import { Player } from '../../../uplift/contexts/PlayersProvider';
import { GameScreen } from '../../components/ui/GameScreen';
import { Game } from '../../../uplift/contexts/MatchupProvider';
import { GamePlayer } from './GamePlayer';
import {PlayerMove} from './PlayerMove';

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


const PositionedPlayerMove = styled.div`
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


const PositionedPlayer1Move = styled(PositionedPlayerMove)`
  bottom: 10%;
  left: 0;
`;

const PositionedPlayer2Move = styled(PositionedPlayerMove)`
  bottom: 0;
  right: 0;
`;


type Props = {
  game: Game;
};

const View = ({ game }: Props) => {
  console.log(game);

  return (
    <GameScreen scrollable={false}>
      <GameplayArea>
        <PositionedPlayer1>
          <GamePlayer imageUrl={game.moves[0].playerAvatarUrl} />
        </PositionedPlayer1>

        <PositionedPlayer2>
          <GamePlayer imageUrl={game.moves[1].playerAvatarUrl} />
        </PositionedPlayer2>

        <PositionedPlayer1Move>
          <PlayerMove />
        </PositionedPlayer1Move>

        <PositionedPlayer2Move>
          <PlayerMove />
        </PositionedPlayer2Move>
      </GameplayArea>
    </GameScreen>
  );
};

export default View;
