import { useEffect, useRef } from 'react';
import { useSound } from '../../contexts/SoundContext';
import { Player } from '../../types/Player';

export const useGroupJoinSoundEffect = (playersJoined: Player[]): void => {
  const { play } = useSound();
  const lastCount = useRef(playersJoined.length);

  useEffect(() => {
    if (playersJoined.length > 0 && playersJoined.length > lastCount.current) {
      play('PlayerJoined');
    }
    lastCount.current = playersJoined.length;
  }, [playersJoined, play]);
};
