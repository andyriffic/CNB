// @flow
import type { AllocateSlotAction } from '../../types/actions/AllocateSlotAction';
import type { MakeMoveAction } from '../../types/actions/MakeMoveAction';
import type { Move } from '../../types/MoveType';
import type {PlayerAvatar} from '../../types/PlayerType';

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

export const makeMoveAction = (slot: string, move: Move, powerUp: string, avatar: PlayerAvatar): MakeMoveAction => {
  return {
    type: MAKE_MOVE_ACTION,
    slot,
    move,
    powerUp,
    avatar,
  };
};
