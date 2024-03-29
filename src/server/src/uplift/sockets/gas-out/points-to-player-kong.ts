import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import { incrementIntegerTag } from '../../utils/tags';
import { GasGame } from './types';

function giveKongImmunity(player: Player): Player {
  return {
    ...player,
    tags: [
      ...player.tags.filter((t) => t !== 'kong_immunity'),
      'kong_immunity',
    ],
  };
}

function giveWinnerBonus(player: Player, game: GasGame): Player {
  if (player.id !== game.winningPlayerId) {
    return player;
  }

  return giveKongImmunity(player);
}

function givePoints(player: Player, points: number, log: Debugger): void {
  log('Giving points: ', player.id, points);
  const newTags = [
    ...incrementIntegerTag('sl_moves:', points, player.tags).filter(
      (t) => t !== 'sl_participant'
    ),
    'sl_participant',
  ];
  playerService.updatePlayerTags(player, newTags).then(() => {
    log('Gave points: ', player.id, points);
  });
}

export function pointsToPlayersKong(game: GasGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    game.allPlayers.forEach((gasPlayer) => {
      const player = allPlayers.find((p) => p.id === gasPlayer.player.id);

      if (!player) return;

      givePoints(giveWinnerBonus(player, game), gasPlayer.points, log);
    });
  });
}
