import { NavigateFn } from '@reach/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { PlayerAvatar } from '../../../components/player-avatar';
import { FeatureText } from '../../../components/ui/Atoms';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useMobProvider } from '../../../providers/MobProvider';
import { useMobSelection } from './hooks/useMobSelection';

const Container = styled.div`
  margin: 0 auto 50px auto;
`;

const PlayerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PlayerListItem = styled.div``;

type Props = {
  navigate: NavigateFn | undefined;
};

export default ({ navigate }: Props) => {
  const [sentInvites, setSentInvites] = useState(false);
  const { joinedPlayers, sendInvites } = useMobSelection();
  const { createMobGame } = useMobProvider();

  const onSendInvitesClick = () => {
    setSentInvites(true);
    sendInvites();
  };

  const onCreateMobClick = () => {
    const mug = selectRandomOneOf(joinedPlayers);
    const mob = joinedPlayers.filter(p => p.id !== mug.id);
    createMobGame(mug, mob, id => {
      navigate && navigate(`/mob/spectator/${id}`);
    });
  };

  return (
    <GameScreen scrollable={true}>
      <Container>
        <FeatureText>Mob Mode!!</FeatureText>
        <div>
          <PlayerList>
            {joinedPlayers.map(p => (
              <PlayerListItem key={p.id}>
                <PlayerAvatar player={p} size="smallMedium" />
              </PlayerListItem>
            ))}
          </PlayerList>
          {!sentInvites && (
            <Button onClick={onSendInvitesClick}>Invite Mob</Button>
          )}
          {sentInvites && joinedPlayers.length > 2 && (
            <Button onClick={onCreateMobClick}>Start Mob</Button>
          )}
        </div>
      </Container>
    </GameScreen>
  );
};
