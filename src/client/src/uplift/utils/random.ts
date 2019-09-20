export const selectRandomOneOf = (items: any[]) => {
  const randomItemIndex = Math.floor(Math.random() * items.length);
  return items[randomItemIndex];
};

export type WeightedItem<T> = {
  weight: number;
  item: T;
};

export function selectWeightedRandomOneOf<T>(
  weightedList: WeightedItem<T>[]
): T {
  // https://medium.com/@peterkellyonline/weighted-random-selection-3ff222917eb6
  const totalWeights = weightedList.reduce((acc, weightedItem) => {
    return acc + weightedItem.weight;
  }, 0);

  let randomWeight = Math.floor(Math.random() * totalWeights) + 1;
  let randomItem: WeightedItem<T>;
  for (let i = 0; i < weightedList.length; i++) {
    randomWeight -= weightedList[i].weight;
    if (randomWeight <= 0) {
      randomItem = weightedList[i];
      break;
    }
  }

  return randomItem!.item;
}
