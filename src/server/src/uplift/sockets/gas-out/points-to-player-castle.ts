import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import { GasGame } from './types';

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

export function pointsToPlayersCastle(game: GasGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    const existingAttackingPlayer = allPlayers.find((p) =>
      p.tags.includes('castle_attacker')
    );
    const newAttackingPlayer = allPlayers.find(
      (p) => p.id === game.winningPlayerId
    );

    if (existingAttackingPlayer?.id !== newAttackingPlayer?.id) {
      clearAttackingPlayer(existingAttackingPlayer, log);
      setAttackingPlayer(newAttackingPlayer, log);
    }
  });
}
