// @flow

import type { Message } from '../messages/MessageType';
import type { MakeMoveAction } from '../types/actions/MakeMoveAction';

export type MakeMoveResponse = {
  makeMoveAction: MakeMoveAction,
}

export type InvalidMoveResponse = {
  message: Message,
}
