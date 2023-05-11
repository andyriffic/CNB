import { Player } from '../contexts/PlayersProvider';

export function getPlayerAttributeValue(
  tags: string[],
  attributeName: string,
  defaultValue: string
): string {
  const tag = tags.find(t => t.startsWith(`${attributeName}:`));
  if (!tag) {
    return defaultValue;
  }
  const value = tag.split(':')[1];
  return value;
}

export const getPlayerSnakesAndLaddersMoves = (tags: string[]) => {
  return parseInt(getPlayerAttributeValue(tags, 'sl_moves', '0'));
};

export const getPlayerIntegerAttributeValue = (
  tags: string[],
  tagName: string,
  defaultValue: number = 0
): number => {
  const tag = tags.find(t => t.startsWith(`${tagName}:`));

  if (!tag) {
    return defaultValue;
  }

  const parsedValue = parseInt(tag.split(':')[1]);
  return parsedValue === undefined ? defaultValue : parsedValue;
};

export const getPlayerBooleanAttributeValue = (
  tags: string[],
  tagName: string,
  defaultValue: boolean = false
): boolean => {
  return tags.includes(tagName) ? true : defaultValue;
};

export const getPlayerStringAttributeValue = (
  tags: string[],
  tagName: string,
  defaultValue: string = ''
): string => {
  const tag = tags.find(t => t.startsWith(`${tagName}:`));

  if (!tag) {
    return defaultValue;
  }

  return tag.split(':')[1];
};

export const getPlayerPowerups = (
  tags: string[]
): { [key: string]: number } => {
  return {
    DOUBLE_POINTS: getPlayerIntegerAttributeValue(
      tags,
      'powerup_DOUBLE_POINTS'
    ),
    POINT_STEALER: getPlayerIntegerAttributeValue(
      tags,
      'powerup_POINT_STEALER'
    ),
    SHORT_FUSE: getPlayerIntegerAttributeValue(tags, 'powerup_SHORT_FUSE'),
  };
};

export const isPlayersBirthday = (player: Player): boolean => {
  const birthDayMonth = getPlayerStringAttributeValue(
    player.tags,
    'birthday',
    ''
  );

  if (!birthDayMonth) {
    return false;
  }

  const [dayNumber, monthNumber] = birthDayMonth.split('-');

  const today = new Date();

  return (
    dayNumber === today.getDate().toString() &&
    monthNumber === (today.getMonth() + 1).toString()
  );
};

export const isPriorityPlayer = (player: Player): boolean => {
  return player.tags.includes('priority_player');
};
