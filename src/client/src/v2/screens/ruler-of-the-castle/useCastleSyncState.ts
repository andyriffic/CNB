import { useEffect } from 'react';
import { getPlayerIntegerAttributeValue } from '../../../uplift/utils/player';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { UseCastleStateResult } from './useCastleState';

export const useCastleSyncState = (castleState: UseCastleStateResult): void => {
  const { updatePlayer } = usePlayersProvider();

  useEffect(() => {
    //Attacking player wins
    if (
      castleState.outcome &&
      castleState.attackingPlayer &&
      castleState.attackingPlayer.player &&
      castleState.attackingPlayer.battleWinner
    ) {
      const newTags = [
        ...castleState.attackingPlayer.player.tags
          .filter(t => !t.startsWith('castle_points'))
          .filter(t => t !== 'castle_defender')
          .filter(t => t !== 'castle_attacker'),
        `castle_points:${getPlayerIntegerAttributeValue(
          castleState.attackingPlayer.player.tags,
          'castle_points',
          0
        ) + 1}`,
        'castle_defender',
      ];
      updatePlayer(castleState.attackingPlayer.player.id, newTags);

      if (castleState.defendingPlayer && castleState.defendingPlayer.player) {
        updatePlayer(
          castleState.defendingPlayer.player.id,
          castleState.defendingPlayer.player.tags.filter(
            t => t !== 'castle_defender'
          )
        );
      }
    }
  }, [castleState]);

  useEffect(() => {
    //Defending player wins
    if (
      castleState.outcome &&
      castleState.defendingPlayer &&
      castleState.defendingPlayer.player &&
      castleState.defendingPlayer.battleWinner
    ) {
      const newTags = [
        ...castleState.defendingPlayer.player.tags
          .filter(t => !t.startsWith('castle_points'))
          .filter(t => t !== 'castle_defender')
          .filter(t => t !== 'castle_attacker'),
        `castle_points:${getPlayerIntegerAttributeValue(
          castleState.defendingPlayer.player.tags,
          'castle_points',
          0
        ) + 1}`,
        'castle_defender',
      ];
      updatePlayer(castleState.defendingPlayer.player.id, newTags);
    }
  }, [castleState]);
};
