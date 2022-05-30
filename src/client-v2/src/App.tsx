import { useMemo } from 'react';
import { PlayerAvatar } from './components/PlayerAvatar';
import { usePlayers } from './contexts/PlayersContext';
import { AnimatedItems } from './components/animations/AnimatedItems';
import { AnimatedItem } from './components/animations/AnimatedItem';

function App() {
  const { activePlayers } = usePlayers();
  const player1 = useMemo(() => {
    return activePlayers.find((p) => p.id === 'andy');
  }, [activePlayers]);
  const player2 = useMemo(() => {
    return activePlayers.find((p) => p.id === 'alex');
  }, [activePlayers]);

  if (!(player1 && player2)) {
    return <p>Loading players</p>;
  }

  return (
    <div>
      <AnimatedItem animationName="spin">
        <h1>App</h1>
      </AnimatedItem>
      <AnimatedItems
        animationName="drop-in"
        options={{ delay: 1.5, stagger: 1 }}
      >
        <PlayerAvatar player={player1} />
        <PlayerAvatar player={player2} facingDirection="left" />
      </AnimatedItems>
    </div>
  );
}

export default App;
