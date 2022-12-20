import { NavigateFn } from '@reach/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FancyLink } from '../../../../components/FancyLink';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import {
  jackInTheBoxAnimation,
  slideInUpAnimation,
} from '../../../../uplift/components/animations';
import { PlayerAvatarWithBirthday } from '../../../components/AvatarWithBirthday';
import { PlayerAvatarWithMobPlacing } from '../../../components/AvatarWithMobPlacing';
import { FeatureText, SubHeading } from '../../../components/ui/Atoms';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useMobProvider } from '../../../providers/MobProvider';
import { Player } from '../../../providers/PlayersProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { ChosenMug } from './ChosenMug';
import { DebugPlayerChoice } from './DebugPlayerChoice';
import { useCountdownTimer } from './hooks/useCountdownTimer';
import { useMobSelection } from './hooks/useMobSelection';
import { useMobSelectionSound } from './hooks/useMobSelectionSound';
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

const COUNTDOWN_SECONDS = 30;

export default ({ navigate }: Props) => {
  const { play } = useSoundProvider();
  const [sentInvites, setSentInvites] = useState(false);
  const { joinedPlayers, sendInvites, selectMug, cleanup } = useMobSelection();
  const { createMobGame } = useMobProvider();
  const [mug, setMug] = useState<Player | undefined>();
  useMobSelectionSound(joinedPlayers, mug);
  const timer = useCountdownTimer(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (timer.status === 'complete') {
      console.log('countdown complete');
      setMug(selectMug());
    }
  }, [timer.status]);

  useEffect(() => {
    if (!mug) return;

    setTimeout(() => {
      const mob = joinedPlayers.filter(p => p.id !== mug.id);
      createMobGame({ mug, mob, gameType: 'standard' }, id => {
        cleanup();
        navigate && navigate(`/mob/spectator/${id}`);
      });
    }, 3000);
  }, [mug]);

  useEffect(() => {
    if (joinedPlayers.length === 3) {
      timer.start();
    }
  }, [joinedPlayers.length]);

  useEffect(() => {
    if (timer.secondsRemaining === 8) {
      play('CountdownTimerWarning');
    }
  }, [timer.secondsRemaining, play]);

  useEffect(() => {
    if (timer.status === 'running') {
      play('CountdownTimerStart');
    }
  }, [timer.status, play]);

  const onSendInvitesClick = () => {
    setSentInvites(true);
    sendInvites();
  };

  const onCreateMobClick = () => {
    timer.stop();
    setMug(selectMug());
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
        <FeatureText>Join the mob</FeatureText>
        <SubHeading>cnb.finx-rocks.com/play</SubHeading>
        <div style={{ textAlign: 'center' }}>
          <FancyLink href="/mob-points-explanation" target="_blank">
            Points!
          </FancyLink>
        </div>

        {!mug && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '20px',
            }}
          >
            {!sentInvites && (
              <Button onClick={onSendInvitesClick}>Invite Mob</Button>
            )}
            {sentInvites && (
              <Button
                onClick={onCreateMobClick}
                disabled={joinedPlayers.length < 3}
              >
                {joinedPlayers.length < 3 ? (
                  'Need minimum of 3 players'
                ) : (
                  <span>
                    Play with mob of <strong>{joinedPlayers.length}</strong>{' '}
                  </span>
                )}
              </Button>
            )}
          </div>
        )}
        <div>
          {!mug && (
            <PlayerList>
              {joinedPlayers.map(p => (
                <PlayerListItem key={p.id}>
                  <PlayerAvatarWithBirthday player={p} size="smallMedium" />
                  {/* <PlayerAvatarWithMobPlacing player={p} size="smallMedium" /> */}
                </PlayerListItem>
              ))}
            </PlayerList>
          )}
        </div>
        {mug && <ChosenMug player={mug} />}
      </Container>
      {timer.status === 'running' && (
        <CountdownTimer warning={timer.secondsRemaining < 10}>
          <ReadableNumberFont>{timer.secondsRemaining}</ReadableNumberFont>{' '}
        </CountdownTimer>
      )}
      {isPersistantFeatureEnabled('cnb-debug') && (
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <DebugPlayerChoice />
        </div>
      )}
    </GameScreen>
  );
};
