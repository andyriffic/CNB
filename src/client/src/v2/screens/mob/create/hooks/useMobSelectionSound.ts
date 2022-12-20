import { Howl, Howler } from 'howler';
import { useEffect, useRef } from 'react';
import { isPlayersBirthday } from '../../../../../uplift/utils/player';
import { usePlayPlayerZodiacSoundByPlayer } from '../../../../providers/hooks/useZodiacSound';
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
  const previousJoinedPlayers = useRef(joinedPlayers);
  const playPlayersZodiacSound = usePlayPlayerZodiacSoundByPlayer(
    'PlayerJoinedMob'
  );

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
    if (chosenMug) {
      !!playingSounds.current['music'] && playingSounds.current['music'].stop();
      play('MugChosen');
    }
  }, [chosenMug]);
}
