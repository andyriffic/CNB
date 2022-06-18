import { useMemo } from 'react';
import { AnimatedItem } from '../../components/animations/AnimatedItem';
import { AnimatedItems } from '../../components/animations/AnimatedItems';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { UiGameScreen } from '../../components/ui/GameScreen';
import { UiTitle } from '../../components/ui/Title';
import { usePlayers } from '../../contexts/PlayersContext';
import { selectRandomOneOf } from '../../utils/random';

export function TestScreen(): JSX.Element {
  const { activePlayers } = usePlayers();
  const player1 = useMemo(() => {
    return selectRandomOneOf(activePlayers);
  }, [activePlayers]);
  const player2 = useMemo(() => {
    return selectRandomOneOf(activePlayers);
  }, [activePlayers]);

  if (!(player1 && player2)) {
    return <p>Loading players</p>;
  }

  return (
    <UiGameScreen>
      <AnimatedItem animationName="spin">
        <UiTitle>App</UiTitle>
      </AnimatedItem>
      <AnimatedItems
        animationName="drop-in"
        options={{ delay: 1.5, stagger: 1 }}
      >
        <PlayerAvatar player={player1} />
        <PlayerAvatar player={player2} facingDirection="left" />
      </AnimatedItems>
    </UiGameScreen>
  );
}
