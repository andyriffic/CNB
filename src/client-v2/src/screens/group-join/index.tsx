import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatedItem } from '../../components/animations/AnimatedItem';
import { DebugPlayerChoice } from '../../components/debug/DebugPlayerChoice';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { UiButton } from '../../components/ui/Button';
import { FeatureLabel } from '../../components/ui/FeatureLabel';
import { UiGameScreen } from '../../components/ui/GameScreen';
import { LayoutCentered } from '../../components/ui/Layouts';
import { UiTitle } from '../../components/ui/Title';
import { useGroupJoinSelection } from '../../hooks/useGroupJoinSelection';

const PlayerListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0 0 0;
  max-width: 90vw;
`;

export function GroupJoinScreen(): JSX.Element {
  const { sendInvites, joinedPlayers, cleanup, status } = useGroupJoinSelection(
    'JOIN GAME',
    'join-open-game'
  );

  useEffect(() => {
    return () => {
      console.log('GroupJoinScreen cleanup');
      cleanup();
    };
  }, [cleanup]);

  const reset = useCallback(() => {
    cleanup();
  }, [cleanup]);

  return (
    <UiGameScreen
      debugContent={
        <>
          <button onClick={reset}>RESET</button>
          <DebugPlayerChoice choiceId="join-open-game" />
        </>
      }
    >
      <LayoutCentered>
        <UiTitle>Join Group</UiTitle>

        {!status && (
          <AnimatedItem animationName="drop-in">
            <UiButton onClick={sendInvites}>Invite Players</UiButton>
          </AnimatedItem>
        )}

        {joinedPlayers.length > 0 && (
          <AnimatedItem animationName="appear-standard">
            <FeatureLabel>Players Joined: {joinedPlayers.length}</FeatureLabel>
          </AnimatedItem>
        )}

        <PlayerListContainer>
          {joinedPlayers.map((p) => (
            <AnimatedItem key={p.id} animationName="appear-standard">
              <PlayerAvatar
                player={p}
                size={joinedPlayers.length > 7 ? 'small' : 'medium'}
              />
            </AnimatedItem>
          ))}
        </PlayerListContainer>
      </LayoutCentered>
    </UiGameScreen>
  );
}
