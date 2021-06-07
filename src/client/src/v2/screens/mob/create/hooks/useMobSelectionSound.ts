import { useEffect, useRef } from 'react';
import { Player } from '../../../../providers/PlayersProvider';
import { useSoundProvider } from '../../../../providers/SoundProvider';

export function useMobSelectionSound(joinedPlayers: Player[]) {
  const { play } = useSoundProvider();
  const totalJoinedPlayers = useRef(joinedPlayers.length);

  useEffect(() => {
    // const waitingMusic = play('WaitForPlayersToJoin');

    return () => {
      //   waitingMusic.stop();
    };
  }, []);

  useEffect(() => {
    if (joinedPlayers.length > totalJoinedPlayers.current) {
      play('PlayerJoinedMob');
      totalJoinedPlayers.current = joinedPlayers.length;
    }
  }, [joinedPlayers]);
}
