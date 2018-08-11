// @flow
import type { AllocateSlotAction } from '../../types/actions/AllocateSlotAction';

export const ALLOCATE_SLOT_ACTION = '[SLOT] Allocate';

export const allocateSlot = (slot: string) => (playerName: string): AllocateSlotAction => {
  return {
    type: ALLOCATE_SLOT_ACTION,
    slot,
    playerName,
  };
};
