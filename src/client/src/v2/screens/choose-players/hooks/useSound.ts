import { useEffect, useRef } from 'react';
import { Howl, HowlOptions } from 'howler';
import { SoundMap } from '../../../services/sound-service/soundMap';
import { play } from '../../../services/sound-service/soundService';
import { Invitation } from '../../../../uplift/contexts/InvitationsProvider';

const usePlayOnce = (
  invitation: Invitation | undefined,
  playerConfirmed: [boolean, boolean],
  playWhen: () => boolean,
  soundKey: keyof SoundMap
) => {
  const played = useRef(false);

  useEffect(() => {
    if (!played.current && playWhen()) {
      played.current = true;
      play(soundKey);
    }
  }, [invitation, playerConfirmed]);
};

const useBackgroundMusic = (soundKey: keyof SoundMap) => {
  const playingSound = useRef<Howl | undefined>(undefined);
  useEffect(() => {
    if (!playingSound.current) {
      playingSound.current = play(soundKey, { loop: true });
    }

    return () => {
      if (playingSound.current) {
        playingSound.current.stop();
      }
    };
  }, []);
};

export const useSound = (
  invitation: Invitation | undefined,
  playerConfirmed: [boolean, boolean]
) => {
  useBackgroundMusic('WaitForPlayersToJoin');

  usePlayOnce(
    invitation,
    playerConfirmed,
    () => playerConfirmed[0],
    'PlayerJoinedGame'
  );

  usePlayOnce(
    invitation,
    playerConfirmed,
    () => playerConfirmed[1],
    'PlayerJoinedGame'
  );
};
