import { useContext, useEffect, useRef, useState } from 'react';
import {
  Invitation,
  useInvitationsProvider,
} from '../../../../uplift/contexts/InvitationsProvider';
import { MatchupContext } from '../../../../uplift/contexts/MatchupProvider';
import {
  Player,
  PlayersContext,
} from '../../../../uplift/contexts/PlayersProvider';
import { getPlayerAttributeValue } from '../../../../uplift/utils/player';

type UseCreateGame = {
  startGame: (
    gameTheme: string,
    onComplete: (matchupId: string) => void
  ) => void;
};

export const useCreateGame = (
  invitation: Invitation | undefined
): UseCreateGame => {
  const { updatePlayer } = useContext(PlayersContext);
  const { addInstantMatchup } = useContext(MatchupContext);
  const { confirmInvitation } = useInvitationsProvider();

  const givePlayerAMove = (player: Player) => {
    updatePlayer(player.id, [
      ...player.tags.filter(t => !t.startsWith('sl_moves')),
      `sl_moves:${parseInt(
        getPlayerAttributeValue(player.tags, 'sl_moves', '0')
      ) + 1}`,
    ]);
  };

  return {
    startGame: (gameTheme, onComplete) => {
      if (!invitation) {
        return;
      }
      givePlayerAMove(invitation.playerInvitations[0].player);
      givePlayerAMove(invitation.playerInvitations[1].player);

      addInstantMatchup(
        invitation.playerInvitations[0].player.id,
        invitation.playerInvitations[1].player.id,
        2,
        gameTheme,
        matchupId => {
          confirmInvitation(invitation.id, matchupId, () => {
            onComplete(matchupId);
          });
        }
      );
    },
  };
};
