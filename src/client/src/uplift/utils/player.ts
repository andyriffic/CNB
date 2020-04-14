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
