export const incrementIntegerTag = (
  tagPrefix: string,
  by: number,
  tags: string[]
): string[] => {
  const existingTag = tags.find(t => t.startsWith(tagPrefix));

  if (!existingTag) {
    return [...tags, `${tagPrefix}${by}`];
  }

  const existingValue = parseInt(existingTag.split(':')[1]);

  return [
    ...tags.filter(t => !t.startsWith(tagPrefix)),
    `${tagPrefix}${existingValue + by}`,
  ];
};
