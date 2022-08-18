import { Howl, Howler } from 'howler';
import { useEffect, useRef } from 'react';
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

    // console.log('NEWLY JOINED PLAYERS', newlyJoinedPlayers);

    previousJoinedPlayers.current = joinedPlayers;

    newlyJoinedPlayers.forEach(p => {
      playPlayersZodiacSound(p);
    });
  }, [joinedPlayers]);

  useEffect(() => {
    if (chosenMug) {
      !!playingSounds.current['music'] && playingSounds.current['music'].stop();
      play('MugChosen');
    }
  }, [chosenMug]);
}
