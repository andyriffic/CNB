import { NavigateFn } from '@reach/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import { jackInTheBoxAnimation } from '../../../../uplift/components/animations';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { PlayerAvatar } from '../../../components/player-avatar';
import { SplashText } from '../../../components/SplashText';
import { FeatureText, SubHeading } from '../../../components/ui/Atoms';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useMobProvider } from '../../../providers/MobProvider';
import { Player } from '../../../providers/PlayersProvider';
import { ChosenMug } from './ChosenMug';
import { DebugPlayerChoice } from './DebugPlayerChoice';
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

type Props = {
  navigate: NavigateFn | undefined;
};

export default ({ navigate }: Props) => {
  const [sentInvites, setSentInvites] = useState(false);
  const { joinedPlayers, sendInvites, cleanup } = useMobSelection();
  const { createMobGame } = useMobProvider();
  const [mug, setMug] = useState<Player | undefined>();
  useMobSelectionSound(joinedPlayers, mug);

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

  const onSendInvitesClick = () => {
    setSentInvites(true);
    sendInvites();
  };

  const onCreateMobClick = () => {
    setMug(selectRandomOneOf(joinedPlayers));
  };

  return (
    <GameScreen scrollable={true}>
      <Container>
        <FeatureText>Join the mob</FeatureText>
        <SubHeading>cnb.finx-rocks.com/play</SubHeading>
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
          {!mug && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {!sentInvites && (
                <Button onClick={onSendInvitesClick}>Invite Mob</Button>
              )}
              {joinedPlayers.length > 2 && (
                <Button onClick={onCreateMobClick}>Start Mob</Button>
              )}
            </div>
          )}
        </div>
        {mug && <ChosenMug player={mug} />}
      </Container>
      {isPersistantFeatureEnabled('cnb-debug') && (
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <DebugPlayerChoice />
        </div>
      )}
    </GameScreen>
  );
};
