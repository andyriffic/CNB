import { NavigateFn } from '@reach/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import {
  jackInTheBoxAnimation,
  slideInUpAnimation,
} from '../../../../uplift/components/animations';
import { shuffleArray } from '../../../../uplift/utils/random';
import { PlayerAvatarWithMobPlacing } from '../../../components/AvatarWithMobPlacing';
import { PlayerAvatar } from '../../../components/player-avatar';
import { FeatureText, SubHeading } from '../../../components/ui/Atoms';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useGasProvider } from '../../../providers/GasProvider';
import { useMobProvider } from '../../../providers/MobProvider';
import { Player } from '../../../providers/PlayersProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { DebugPlayerChoice } from './DebugPlayerChoice';
import { useOpenPlayerSelection } from './hooks/useOpenSelection';
import { useSound } from './hooks/useSound';
import { ProbablyWantPlayScreen } from './ProbablyWantPlayScreen';

const Container = styled.div`
  margin: 0 auto 50px auto;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const ProbablyPlayContainer = styled.div`
  margin: 0 auto 50px auto;
  display: none;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const PlayerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 40px 0;
`;
const PlayerListItem = styled.div`
  animation: ${jackInTheBoxAnimation} 600ms both;
`;

const CountdownTimer = styled.div<{ warning: boolean }>`
  position: fixed;
  padding: 30px;
  min-width: 150px;
  border-radius: 0 10px 0 0;
  bottom: 0;
  left: 0;
  font-size: 3rem;
  text-align: center;
  transition: background-color 10s ease-out;
  background-color: ${({ warning }) => (warning ? 'red' : 'white')};
  color: black;
  animation: ${slideInUpAnimation} 600ms ease-in 0s 1 both;
`;

type Props = {
  navigate: NavigateFn | undefined;
};

export default ({ navigate }: Props) => {
  const { createGasGame } = useGasProvider();
  const { play } = useSoundProvider();
  const [sentInvites, setSentInvites] = useState(false);
  const { joinedPlayers, sendInvites, cleanup } = useOpenPlayerSelection();
  useSound(joinedPlayers);

  const onSendInvitesClick = () => {
    setSentInvites(true);
    sendInvites();
  };

  const onStartGameClick = () => {
    cleanup();
    createGasGame({ players: shuffleArray(joinedPlayers) }, gameId => {
      window.location.href = `/gas/game/${gameId}?feature=carousel,transparent`;
    });
  };

  return (
    <GameScreen scrollable={true}>
      {/* <MobLeaders /> */}
      <ProbablyPlayContainer>
        <ProbablyWantPlayScreen
          onPlayClick={() => {
            navigate && navigate('/play');
          }}
        />
      </ProbablyPlayContainer>
      <Container>
        <FeatureText>Join the game</FeatureText>
        <SubHeading>cnb.finx-rocks.com/play</SubHeading>

        {!sentInvites && joinedPlayers.length === 0 && (
          <Button onClick={onSendInvitesClick}>Invite Players</Button>
        )}

        {joinedPlayers.length > 3 && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <Button onClick={onStartGameClick}>
              Start Game with <strong>{joinedPlayers.length}</strong> players
            </Button>
          </div>
        )}

        <PlayerList>
          {joinedPlayers.map(p => (
            <PlayerListItem key={p.id}>
              <PlayerAvatar player={p} size="smallMedium" showZodiac={false} />
            </PlayerListItem>
          ))}
        </PlayerList>
      </Container>
      {isPersistantFeatureEnabled('cnb-debug') && (
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <DebugPlayerChoice />
        </div>
      )}
    </GameScreen>
  );
};
