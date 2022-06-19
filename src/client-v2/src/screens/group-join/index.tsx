import { useEffect } from 'react';
import { AnimatedItem } from '../../components/animations/AnimatedItem';
import { AnimatedItems } from '../../components/animations/AnimatedItems';
import { DebugPlayerChoice } from '../../components/debug/DebugPlayerChoice';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { UiButton } from '../../components/ui/Button';
import { FeatureLabel } from '../../components/ui/FeatureLabel';
import { UiGameScreen } from '../../components/ui/GameScreen';
import { LayoutCentered } from '../../components/ui/Layouts';
import { UiTitle } from '../../components/ui/Title';
import { useGroupJoinSelection } from '../../hooks/useGroupJoinSelection';

export function GroupJoinScreen(): JSX.Element {
  const { sendInvites, joinedPlayers, cleanup, status } = useGroupJoinSelection(
    'JOIN GANE',
    'join-open-game'
  );

  useEffect(() => {
    return () => {
      console.log('GroupJoinScreen cleanup');
      cleanup();
    };
  }, []);

  return (
    <UiGameScreen
      debugContent={<DebugPlayerChoice choiceId="join-open-game" />}
    >
      <LayoutCentered>
        <UiTitle>Group Join</UiTitle>

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

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            margin: '2rem 0 0 0',
            maxWidth: '90vw',
          }}
        >
          {joinedPlayers.map((p) => (
            <div key={p.id}>
              <AnimatedItem animationName="appear-standard">
                <PlayerAvatar
                  player={p}
                  size={joinedPlayers.length > 7 ? 'small' : 'medium'}
                />
              </AnimatedItem>
            </div>
          ))}
        </div>
      </LayoutCentered>
    </UiGameScreen>
  );
}
