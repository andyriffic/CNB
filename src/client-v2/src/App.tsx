import './App.css';
import { PlayerAvatar } from './components/PlayerAvatar';
import { usePlayers } from './contexts/PlayersContext';

function App() {
  const { activePlayers } = usePlayers();

  return (
    <div>
      <h1>App</h1>
      <div>
        {activePlayers.map((p) => (
          <div key={p.id}>
            <PlayerAvatar player={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
