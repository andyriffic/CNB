import { Howl, Howler } from 'howler';
import { useEffect, useRef } from 'react';
import { Player } from '../../../../providers/PlayersProvider';
import {
  SoundMap,
  useSoundProvider,
} from '../../../../providers/SoundProvider';

export function useSound(joinedPlayers: Player[]) {
  const { play } = useSoundProvider();
  const totalJoinedPlayers = useRef(joinedPlayers.length);
  const playingSounds = useRef<{ [id: string]: Howl }>({});

  useEffect(() => {
    if (playingSounds.current['music']) return;

    playingSounds.current['music'] = play('ChoseMobMusic', { loop: true });

    return () => {
      playingSounds.current['music']!.stop();
    };
  }, []);

  useEffect(() => {
    if (joinedPlayers.length > totalJoinedPlayers.current) {
      play('GasCloudPress');
      totalJoinedPlayers.current = joinedPlayers.length;
    }
  }, [joinedPlayers]);

  useEffect(() => {
    return () => {
      playingSounds.current['music'] && playingSounds.current['music'].stop();
    };
  }, []);
}
