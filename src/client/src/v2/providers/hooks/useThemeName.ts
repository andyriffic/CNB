import { useEffect, useState } from 'react';
import { getPlayerAttributeValue } from '../../../uplift/utils/player';
import { usePlayersProvider } from '../PlayersProvider';

export type ThemeName = 'default' | 'halloween';

export const useThemeName = (): ThemeName => {
  const { allPlayers } = usePlayersProvider();
  const [themeName, setThemeName] = useState<ThemeName>('default');

  useEffect(() => {
    if (!allPlayers.length) {
      return;
    }

    const settingsPlayer = allPlayers.find(p => p.id === 'mc_settings_face');
    if (!settingsPlayer) {
      setThemeName('default');
    } else {
      const configuredThemeName = getPlayerAttributeValue(
        settingsPlayer.tags,
        'theme',
        'default'
      ) as ThemeName;
      setThemeName(configuredThemeName);
    }
  }, [allPlayers]);

  return themeName;
};
