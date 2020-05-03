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

const getPlayerIntegerAttributeValue = (
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

export const getPlayerPowerups = (
  tags: string[]
): { [key: string]: number } => {
  return {
    DOUBLE_POINTS: getPlayerIntegerAttributeValue(tags, 'powerup_double'),
  };
};
