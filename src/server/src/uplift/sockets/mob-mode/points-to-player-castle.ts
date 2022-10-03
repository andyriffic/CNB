import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import { MobGame } from './types';

function setAttackingPlayer(player: Player | undefined, log: Debugger): void {
  if (!player) {
    log('No Attacking player to set');
    return;
  }

  log('Setting attacking player: ', player.id);
  const newTags = [
    ...player.tags.filter((t) => t !== 'castle_attacker'),
    `castle_attacker`,
  ];

  playerService.updatePlayerTags(player, newTags).then(() => {
    log('Set attacking player: ', player.id);
  });
}

function clearAttackingPlayer(player: Player | undefined, log: Debugger): void {
  if (!player) {
    log('No Attacking player');
    return;
  }

  log('Clearing attacking player: ', player.id);
  const newTags = player.tags.filter((t) => t !== 'castle_attacker');

  playerService.updatePlayerTags(player, newTags).then(() => {
    log('Cleared attacking player: ', player.id);
  });
}

function wonAttackingRights(player: Player, mobGame: MobGame): boolean {
  const survivingMobPlayers = mobGame.mobPlayers.filter((mp) => mp.active);
  const mugWinner =
    survivingMobPlayers.length === 0 && mobGame.mugPlayer.lives > 0;
  const soleMobSurvivor =
    survivingMobPlayers.length === 1 ? survivingMobPlayers[0] : undefined;

  if (
    player.id === mobGame.mugPlayer.playerId &&
    (mugWinner || survivingMobPlayers.length > 1)
  ) {
    return true;
  }

  if (soleMobSurvivor && survivingMobPlayers[0].playerId === player.id) {
    return true;
  }

  return false;
}

export function pointsToPlayersCastle(mobGame: MobGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    //TODO: need to remove attack tag from a player if they didn't play the game

    const mugPlayer = allPlayers.find(
      (p) => p.id === mobGame.mugPlayer.playerId
    );

    if (mugPlayer && wonAttackingRights(mugPlayer, mobGame)) {
      setAttackingPlayer(mugPlayer, log);
    } else {
      clearAttackingPlayer(mugPlayer, log);
    }

    mobGame.points.mobPlayers.forEach((mobPlayerPoints) => {
      const mobPlayer = allPlayers.find(
        (p) => p.id === mobPlayerPoints.playerId
      );

      if (!mobPlayer) return;

      if (wonAttackingRights(mobPlayer, mobGame)) {
        setAttackingPlayer(mobPlayer, log);
      } else {
        clearAttackingPlayer(mobPlayer, log);
      }
    });
  });
}
