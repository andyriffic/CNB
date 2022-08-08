import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import {
  getIntegerAttributeValue,
  incrementIntegerTag,
} from '../../utils/tags';
import { GasGame } from './types';

function givePoints(player: Player, points: number, log: Debugger): void {
  log('Giving points: ', player.id, points);
  const newTags = [
    ...incrementIntegerTag('rt_moves:', points, player.tags).filter(
      (t) => t !== 'racer'
    ),
    'racer',
  ];
  playerService.updatePlayerTags(player, newTags).then(() => {
    log('Gave points: ', player.id, points);
  });
}

export function pointsToPlayersRacing(game: GasGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    game.allPlayers.forEach((gasPlayer) => {
      const player = allPlayers.find((p) => p.id === gasPlayer.player.id);
      if (!player) {
        return;
      }
      givePoints(gasPlayer.player, gasPlayer.points, log);
    });
  });
}
