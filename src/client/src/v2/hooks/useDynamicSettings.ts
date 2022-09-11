import { useEffect, useState } from 'react';
import { getPlayerIntegerAttributeValue } from '../../uplift/utils/player';
import { Player } from '../providers/PlayersProvider';
import { usePlayer } from '../screens/play/hooks/usePlayer';

export type DynamicSettings = {
  hasLoaded: boolean;
  raceTrack: {
    roadBlockSectionIndex: number;
  };
  gasGame: {
    playerMoveTimeoutMilliseconds: number;
  };
};

const defaultSettings: DynamicSettings = {
  hasLoaded: false,
  raceTrack: {
    roadBlockSectionIndex: -1,
  },
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
    raceTrack: {
      roadBlockSectionIndex: getPlayerIntegerAttributeValue(
        player.tags,
        'race_track_road_block_section_index',
        -1
      ),
    },
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
