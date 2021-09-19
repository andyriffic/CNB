import { useEffect, useState } from 'react';
import { getPlayerAttributeValue } from '../../../uplift/utils/player';
import { themeComponentMap, ThemeComponents, ThemeName } from '../../themes';
import { usePlayersProvider } from '../PlayersProvider';
import defaultThemeComponents from '../../themes/default';

export const useThemeComponents = (): ThemeComponents | undefined => {
  const { allPlayers } = usePlayersProvider();
  const [themeComponents, setThemeComponents] = useState<
    ThemeComponents | undefined
  >();

  useEffect(() => {
    // console.log('THEME COMPONENTS', allPlayers);

    if (!allPlayers.length) {
      return;
    }

    const settingsPlayer = allPlayers.find(p => p.id === 'mc_settings_face');
    if (!settingsPlayer) {
      setThemeComponents(defaultThemeComponents);
    } else {
      const configuredThemeName = getPlayerAttributeValue(
        settingsPlayer.tags,
        'theme',
        'default'
      ) as ThemeName;
      setThemeComponents(
        themeComponentMap[configuredThemeName] || defaultThemeComponents
      );
    }
  }, [allPlayers]);

  return themeComponents;
};
