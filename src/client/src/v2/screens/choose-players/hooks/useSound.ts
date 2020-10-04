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

const useWhenSwitchingPlayers = (
  invitation: Invitation | undefined,
  soundKey: keyof SoundMap
) => {
  const playerIds = useRef<string[]>([]);
  useEffect(() => {
    if (!invitation) {
      return;
    }
    if (!playerIds.current.length) {
      playerIds.current = invitation.playerInvitations.map(i => i.player.id);
      return;
    }

    if (
      !invitation.playerInvitations.every(pi =>
        playerIds.current.includes(pi.player.id)
      )
    ) {
      playerIds.current = invitation.playerInvitations.map(i => i.player.id);
      play(soundKey);
    }
  }, [invitation]);
};

export const useSound = (
  invitation: Invitation | undefined,
  playerConfirmed: [boolean, boolean]
) => {
  useBackgroundMusic('WaitForPlayersToJoin');

  useWhenSwitchingPlayers(invitation, 'SwitchPlayer');

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
