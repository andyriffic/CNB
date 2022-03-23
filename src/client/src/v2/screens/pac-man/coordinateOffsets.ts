import { Coordinates } from './types';

const offsetMap: Coordinates[] = [
  { x: 0, y: 0 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -2, y: 0 },
  { x: -2, y: -2 },
  { x: 0, y: -2 },
  { x: 2, y: 0 },
  { x: 2, y: 2 },
  { x: 0, y: 2 },
];

export function getCoordinatesForOffset(offset: number): Coordinates {
  const mappedOffset = offsetMap[offset];

  if (!mappedOffset) {
    return { x: 0, y: 0 };
  }

  return mappedOffset;
}
