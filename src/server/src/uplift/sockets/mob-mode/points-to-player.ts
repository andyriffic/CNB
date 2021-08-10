import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import { incrementIntegerTag } from '../../utils/tags';
import { MobGame } from './types';

function givePoints(player: Player, points: number, log: Debugger): void {
  log('Giving points: ', player.id, points);
  const newTags = incrementIntegerTag('sl_moves:', points, player.tags);
  playerService.updatePlayerTags(player, newTags).then(() => {
    log('Gave points: ', player.id, points);
  });
}

export function pointsToPlayers(mobGame: MobGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    const mugPlayer = allPlayers.find(
      (p) => p.id === mobGame.mugPlayer.player.id
    );

    if (mugPlayer) {
      givePoints(mugPlayer, mobGame.points.mugPlayer, log);
    }

    mobGame.points.mobPlayers.forEach((mobPlayerPoints) => {
      const mobPlayer = allPlayers.find(
        (p) => p.id === mobPlayerPoints.playerId
      );

      if (!mobPlayer) return;

      givePoints(mobPlayer, mobPlayerPoints.points, log);
    });
  });

  playerService.updatePlayerTags;
}
