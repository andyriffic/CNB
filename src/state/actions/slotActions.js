// @flow
import type { AllocateSlotAction } from '../../types/actions/AllocateSlotAction';

const ALLOCATE_SLOT_ACTION = '[SLOT] Allocate';

export const allocateSlot = (slot: string /*TODO: should this be a string?*/): AllocateSlotAction => {
  return {
    type: ALLOCATE_SLOT_ACTION,
    slot,
  };
};
