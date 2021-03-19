import {
  Invitation,
  PlayerInvitation,
  useInvitationsProvider,
} from '../../../providers/InvitationsProvider';
import { useMatchupProvider } from '../../../providers/MatchupProvider';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { getPlayerAttributeValue } from '../../../../uplift/utils/player';

type UseCreateGame = {
  startGame: (
    gameTheme: string,
    onComplete: (matchupId: string) => void
  ) => void;
};

const getStartingMoves = (playerInvitation: PlayerInvitation): number => {
  return playerInvitation.joinedOrder === 1 ? 2 : 1;
};

export const useCreateGame = (
  invitation: Invitation | undefined
): UseCreateGame => {
  const { updatePlayer } = usePlayersProvider();
  const { addInstantMatchup } = useMatchupProvider();
  const { confirmInvitation } = useInvitationsProvider();

  const givePlayerAMove = (player: Player, moves: number) => {
    updatePlayer(player.id, [
      ...player.tags.filter(t => !t.startsWith('sl_moves')),
      `sl_moves:${parseInt(
        getPlayerAttributeValue(player.tags, 'sl_moves', '0')
      ) + moves}`,
    ]);
  };

  return {
    startGame: (gameTheme, onComplete) => {
      if (!invitation) {
        return;
      }
      givePlayerAMove(
        invitation.playerInvitations[0].player,
        getStartingMoves(invitation.playerInvitations[0])
      );
      givePlayerAMove(
        invitation.playerInvitations[1].player,
        getStartingMoves(invitation.playerInvitations[1])
      );

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
