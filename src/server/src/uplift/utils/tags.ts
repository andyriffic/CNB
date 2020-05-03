export const incrementIntegerTag = (
  tagPrefix: string,
  by: number,
  tags: string[]
): string[] => {
  const existingTag = tags.find((t) => t.startsWith(tagPrefix));

  if (!existingTag) {
    return [...tags, `${tagPrefix}${by}`];
  }

  const existingValue = parseInt(existingTag.split(':')[1]);

  return [
    ...tags.filter((t) => !t.startsWith(tagPrefix)),
    `${tagPrefix}${existingValue + by}`,
  ];
};

const getIntegerAttributeValue = (
  tags: string[],
  tagName: string,
  defaultValue: number = 0
): number => {
  const tag = tags.find((t) => t.startsWith(`${tagName}:`));

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
    DOUBLE_POINTS: getIntegerAttributeValue(tags, 'powerup_DOUBLE_POINTS'),
  };
};
