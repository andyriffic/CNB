// @flow
import type { Move } from './MoveType';

export type Player = {
  name?: string,
  move?: Move,
  powerUp?: string,
  avatar: PlayerAvatar
};

export type PlayerAvatar = {
  name: string,
  imageName: string,
}
