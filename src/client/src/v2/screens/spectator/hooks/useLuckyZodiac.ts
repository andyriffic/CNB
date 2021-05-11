import { useEffect, useRef } from 'react';
import { getPlayerAttributeValue } from '../../../../uplift/utils/player';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';

type UseLuckyZodiacResult = {
  luckySign: string;
  giveLuckyZodiacPoints: () => void;
};

const allUniquePlayerZodiacSigns = (allPlayers: Player[]): string[] => {
  const activeZodiacSigns = allPlayers
    .filter(p => !p.tags.includes('retired'))
    .filter(p => p.tags.includes('sl_participant'))
    .flatMap(p => p.tags)
    .filter(t => t.startsWith('chinese_zodiac:'))
    .map(t => t.split('chinese_zodiac:')[1]);

  return activeZodiacSigns;
};

const getLuckySign = (allPlayers: Player[]) => {
  return selectRandomOneOf(allUniquePlayerZodiacSigns(allPlayers));
};

export const useLuckyZodiac = (): UseLuckyZodiacResult => {
  const { allPlayers, updatePlayer } = usePlayersProvider();
  const luckySign = useRef(getLuckySign(allPlayers));

  useEffect(() => {
    if (luckySign.current) {
      return;
    }

    luckySign.current = getLuckySign(allPlayers);
  }, [allPlayers]);

  const giveLuckyZodiacPoints = () => {
    const BONUS_ZODIAC_POINTS = 2;
    if (!luckySign.current) {
      return;
    }
    allPlayers
      .filter(p => !p.tags.includes('retired'))
      .filter(p => p.tags.includes('sl_participant'))
      .filter(p => p.tags.includes(`chinese_zodiac:${luckySign.current}`))
      .forEach(p => {
        updatePlayer(p.id, [
          ...p.tags.filter(t => !t.startsWith('sl_moves')),
          `sl_moves:${parseInt(
            getPlayerAttributeValue(p.tags, 'sl_moves', '0')
          ) + BONUS_ZODIAC_POINTS}`,
        ]);
      });
  };

  return {
    luckySign: luckySign.current,
    giveLuckyZodiacPoints,
  };
};
