// https://javascript.info/task/shuffle
export const shuffle = array => {
  const arrayClone = [...array];
  for (let i = arrayClone.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [arrayClone[i], arrayClone[j]] = [arrayClone[j], arrayClone[i]]; // swap elements
  }
  return arrayClone;
};
