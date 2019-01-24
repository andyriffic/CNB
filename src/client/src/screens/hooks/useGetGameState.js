import { useContext, useEffect } from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';

const useGetGameState = () => {
  const gameState = useContext(GameStateContext);
  const serverMessages = useContext(ServerMessagesContext);

  // trigger a get of the game Status
  // maybe only do this if the gameState from context is empty?
  useEffect(() => {
    if (!gameState) {
      serverMessages.getGameState();
    }
  }, []);
};

export default useGetGameState;
