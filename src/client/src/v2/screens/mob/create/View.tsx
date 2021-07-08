import { NavigateFn } from '@reach/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import {
  fadeInAnimation,
  jackInTheBoxAnimation,
} from '../../../../uplift/components/animations';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { PlayerAvatar } from '../../../components/player-avatar';
import { FeatureText, SubHeading } from '../../../components/ui/Atoms';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useMobProvider } from '../../../providers/MobProvider';
import { Player } from '../../../providers/PlayersProvider';
import { ChosenMug } from './ChosenMug';
import { DebugPlayerChoice } from './DebugPlayerChoice';
import { useCountdownTimer } from './hooks/useCountdownTimer';
import { useMobSelection } from './hooks/useMobSelection';
import { useMobSelectionSound } from './hooks/useMobSelectionSound';

const Container = styled.div`
  margin: 0 auto 50px auto;
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
  animation: ${fadeInAnimation} 1s ease-in 0s 1 both;
`;

type Props = {
  navigate: NavigateFn | undefined;
};

export default ({ navigate }: Props) => {
  const [sentInvites, setSentInvites] = useState(false);
  const { joinedPlayers, sendInvites, cleanup } = useMobSelection();
  const { createMobGame } = useMobProvider();
  const [mug, setMug] = useState<Player | undefined>();
  useMobSelectionSound(joinedPlayers, mug);
  const timer = useCountdownTimer(11, () => {
    console.log('countdown complete');
    // setMug(selectRandomOneOf(joinedPlayers));
  });

  useEffect(() => {
    if (!mug) return;

    setTimeout(() => {
      const mob = joinedPlayers.filter(p => p.id !== mug.id);
      createMobGame(mug, mob, id => {
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

  const onSendInvitesClick = () => {
    setSentInvites(true);
    sendInvites();
  };

  const onCreateMobClick = () => {
    timer.stop();
    setMug(selectRandomOneOf(joinedPlayers));
  };

  return (
    <GameScreen scrollable={true}>
      <Container>
        <FeatureText>Join the mob</FeatureText>
        <SubHeading>cnb.finx-rocks.com/play</SubHeading>
        {!mug && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '60px',
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
                  <PlayerAvatar player={p} size="smallMedium" />
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
