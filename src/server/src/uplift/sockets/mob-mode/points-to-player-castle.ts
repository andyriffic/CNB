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

function getWinningAttackerId(mobGame: MobGame): string {
  const survivingMobPlayers = mobGame.mobPlayers.filter((mp) => mp.active);
  const mugWinner =
    survivingMobPlayers.length === 0 && mobGame.mugPlayer.lives > 0;
  const soleMobSurvivor =
    survivingMobPlayers.length === 1 ? survivingMobPlayers[0] : undefined;

  if (mugWinner || survivingMobPlayers.length > 1) {
    return mobGame.mugPlayer.playerId;
  }

  if (soleMobSurvivor) {
    return soleMobSurvivor.playerId;
  }

  console.log('Could not determine Winning player for castle game');
  return '';
}

export function pointsToPlayersCastle(mobGame: MobGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    //TODO: need to remove attack tag from a player if they didn't play the game

    const existingAttackingPlayer = allPlayers.find((p) =>
      p.tags.includes('castle_attacker')
    );

    const newAttackingPlayerId = getWinningAttackerId(mobGame);

    const newAttackingPlayer = newAttackingPlayerId
      ? allPlayers.find((p) => p.id === newAttackingPlayerId)
      : undefined;

    if (existingAttackingPlayer?.id !== newAttackingPlayer?.id) {
      clearAttackingPlayer(existingAttackingPlayer, log);
      setAttackingPlayer(newAttackingPlayer, log);
    }
  });
}
