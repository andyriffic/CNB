import { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { PlayerAvatar } from './components/PlayerAvatar';
import { usePlayers } from './contexts/PlayersContext';
import { AnimatedItems } from './components/animations/AnimatedItems';
import { AnimatedItem } from './components/animations/AnimatedItem';
import { UiGameScreen } from './components/ui/GameScreen';
import theme from './themes/default';
import { UiTitle } from './components/ui/Title';
import { selectRandomOneOf } from './utils/random';

function App() {
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
