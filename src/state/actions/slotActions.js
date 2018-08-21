// @flow
import type { AllocateSlotAction } from '../../types/actions/AllocateSlotAction';
import type { MakeMoveAction } from '../../types/actions/MakeMoveAction';

export const ALLOCATE_SLOT_ACTION = '[SLOT] Allocate';
export const MAKE_MOVE_ACTION = '[SLOT] Make Move';

export const allocateSlotAction = (slot: string) => (playerName: string, clientId: string): AllocateSlotAction => {
  return {
    type: ALLOCATE_SLOT_ACTION,
    slot,
    playerName,
    clientId,
  };
};

export const makeMoveAction = (slot: string, move: string): MakeMoveAction => {
  return {
    type: MAKE_MOVE_ACTION,
    slot,
    move,
  };
};
