import random from 'random';

export function selectRandomOneOf<T>(items: T[]): T {
  const randomItemIndex = random.int(0, items.length - 1);
  return items[randomItemIndex];
}

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

  let randomWeight = random.int(1, totalWeights);
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

// https://javascript.info/task/shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const arrayClone = [...array];
  for (let i = arrayClone.length - 1; i > 0; i--) {
    let j = random.int(0, i);
    [arrayClone[i], arrayClone[j]] = [arrayClone[j], arrayClone[i]]; // swap elements
  }
  return arrayClone;
}
