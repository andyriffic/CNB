export const selectRandomOneOf = (items: any[]) => {
  const randomItemIndex = Math.floor(Math.random() * items.length);
  return items[randomItemIndex];
};
