// @flow
import type { AllocateSlotAction } from '../types/actions/AllocateSlotAction';
import type { Message } from '../messages/MessageType';

export type ConnectedToGameResponse = {
  allocateSlotAction: AllocateSlotAction,
  message: Message,
};

export type GameIsFullResponse = {
  message: Message,
};
