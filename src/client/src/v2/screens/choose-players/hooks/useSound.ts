import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { PlaySound, SoundMap } from '../../../providers/SoundProvider';
import { Invitation } from '../../../providers/InvitationsProvider';

const usePlayOnce = (
  invitation: Invitation | undefined,
  playerConfirmed: [boolean, boolean],
  playWhen: () => boolean,
  soundKey: keyof SoundMap,
  play: PlaySound
) => {
  const played = useRef(false);

  useEffect(() => {
    if (!played.current && playWhen()) {
      played.current = true;
      play(soundKey);
    }
  }, [invitation, playerConfirmed]);
};

const useBackgroundMusic = (soundKey: keyof SoundMap, play: PlaySound) => {
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
  soundKey: keyof SoundMap,
  play: PlaySound
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
  playerConfirmed: [boolean, boolean],
  play: PlaySound
) => {
  useBackgroundMusic('WaitForPlayersToJoin', play);

  useWhenSwitchingPlayers(invitation, 'SwitchPlayer', play);

  usePlayOnce(
    invitation,
    playerConfirmed,
    () => playerConfirmed[0],
    'PlayerJoinedGame',
    play
  );

  usePlayOnce(
    invitation,
    playerConfirmed,
    () => playerConfirmed[1],
    'PlayerJoinedGame',
    play
  );
};
