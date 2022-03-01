import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import { incrementIntegerTag } from '../../utils/tags';
import { GasGame } from './types';

function givePoints(player: Player, points: number, log: Debugger): void {
  log('Giving points: ', player.id, points);
  const newTags = [
    ...incrementIntegerTag('pac_moves:', points, player.tags).filter(
      (t) => t !== 'pac_player'
    ),
    'pac_player',
  ];
  playerService.updatePlayerTags(player, newTags).then(() => {
    log('Gave points: ', player.id, points);
  });
}

export function pointsToPlayersPacman(game: GasGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    game.allPlayers.forEach((gasPlayer) => {
      const player = allPlayers.find((p) => p.id === gasPlayer.player.id);

      if (!player) return;

      givePoints(player, gasPlayer.points, log);
    });
  });
}
