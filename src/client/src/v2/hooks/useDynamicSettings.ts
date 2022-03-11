import { useEffect, useState } from 'react';
import { getPlayerIntegerAttributeValue } from '../../uplift/utils/player';
import { Player } from '../providers/PlayersProvider';
import { usePlayer } from '../screens/play/hooks/usePlayer';

export type DynamicSettings = {
  hasLoaded: boolean;
  gasGame: {
    playerMoveTimeoutMilliseconds: number;
  };
};

const defaultSettings: DynamicSettings = {
  hasLoaded: false,
  gasGame: {
    playerMoveTimeoutMilliseconds: 3000,
  },
};

function getSettings(player: Player | undefined): DynamicSettings {
  if (!player) {
    return defaultSettings;
  }

  return {
    hasLoaded: true,
    gasGame: {
      playerMoveTimeoutMilliseconds: getPlayerIntegerAttributeValue(
        player.tags,
        'gas_player_timeout',
        3000
      ),
    },
  };
}

export function useDynamicSettings(): DynamicSettings {
  const settingsPlayer = usePlayer('mc_settings_face');
  const [settings, setSettings] = useState(getSettings(settingsPlayer));

  useEffect(() => {
    setSettings(getSettings(settingsPlayer));
  }, [settingsPlayer]);

  return settings;
}
