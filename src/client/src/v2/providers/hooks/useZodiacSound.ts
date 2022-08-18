import { useCallback } from 'react';
import { getPlayerAttributeValue } from '../../../uplift/utils/player';
import { Player, usePlayersProvider } from '../PlayersProvider';
import { SoundMap, useSoundProvider } from '../SoundProvider';

const getPlayerZodiacSoundName = (player: Player): keyof SoundMap => {
  const playerZodiac = getPlayerAttributeValue(
    player.tags,
    'chinese_zodiac',
    ''
  );
  return `zodiac_${playerZodiac}` as keyof SoundMap;
};

export const usePlayPlayerZodiacSoundByPlayer = (
  player: Player,
  fallbackSound: keyof SoundMap
): (() => void) => {
  const { play } = useSoundProvider();

  return useCallback(() => {
    const sound = play(getPlayerZodiacSoundName(player));

    if (sound.state() === 'unloaded') {
      play(fallbackSound);
    }
  }, []);
};

export const usePlayPlayerZodiacSoundByPlayerId = (
  fallbackSound: keyof SoundMap
): ((playerId: string) => void) => {
  const { play } = useSoundProvider();
  const { allPlayers } = usePlayersProvider();

  return useCallback(
    (playerId: string) => {
      const player = allPlayers.find(p => p.id === playerId);
      if (!player) {
        return;
      }
      const sound = play(getPlayerZodiacSoundName(player));

      if (sound.state() === 'unloaded') {
        play(fallbackSound);
      }
    },
    [allPlayers]
  );
};
