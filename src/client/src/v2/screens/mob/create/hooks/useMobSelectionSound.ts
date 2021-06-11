import { Howl, Howler } from 'howler';
import { useEffect, useRef } from 'react';
import { Player } from '../../../../providers/PlayersProvider';
import {
  SoundMap,
  useSoundProvider,
} from '../../../../providers/SoundProvider';

export function useMobSelectionSound(
  joinedPlayers: Player[],
  chosenMug?: Player
) {
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
      play('PlayerJoinedMob');
      totalJoinedPlayers.current = joinedPlayers.length;
    }
  }, [joinedPlayers]);

  useEffect(() => {
    if (chosenMug) {
      !!playingSounds.current['music'] && playingSounds.current['music'].stop();
      play('MugChosen');
    }
  }, [chosenMug]);
}
