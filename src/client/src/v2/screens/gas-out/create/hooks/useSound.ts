import { Howl } from 'howler';
import { useEffect, useRef } from 'react';
import { isPlayersBirthday } from '../../../../../uplift/utils/player';
import { usePlayPlayerZodiacSoundByPlayer } from '../../../../providers/hooks/useZodiacSound';
import { Player } from '../../../../providers/PlayersProvider';
import { useSoundProvider } from '../../../../providers/SoundProvider';

export function useSound(joinedPlayers: Player[]) {
  const { play } = useSoundProvider();
  const playPlayersZodiacSound = usePlayPlayerZodiacSoundByPlayer(
    'GasCloudPress'
  );
  const previousJoinedPlayers = useRef(joinedPlayers);
  const playingSounds = useRef<{ [id: string]: Howl }>({});

  useEffect(() => {
    if (playingSounds.current['music']) return;

    playingSounds.current['music'] = play('ChoseMobMusic', { loop: true });

    return () => {
      playingSounds.current['music']!.stop();
    };
  }, []);

  useEffect(() => {
    const newlyJoinedPlayers = joinedPlayers.filter(
      p => !previousJoinedPlayers.current.find(jp => jp.id === p.id)
    );

    previousJoinedPlayers.current = joinedPlayers;

    newlyJoinedPlayers.forEach(p => {
      playPlayersZodiacSound(p);
    });

    if (newlyJoinedPlayers.some(isPlayersBirthday)) {
      playingSounds.current['music'] && playingSounds.current['music'].stop();
      playingSounds.current['music'] = play('happyBirthday', { loop: true });
    }
  }, [joinedPlayers]);

  useEffect(() => {
    return () => {
      playingSounds.current['music'] && playingSounds.current['music'].stop();
    };
  }, []);
}
