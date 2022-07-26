import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import { incrementIntegerTag } from '../../utils/tags';
import { MobGame } from './types';

function giveKongImmunity(player: Player): Player {
  return {
    ...player,
    tags: [
      ...player.tags.filter((t) => t !== 'kong_immunity'),
      'kong_immunity',
    ],
  };
}

function giveWinnerBonus(player: Player, mobGame: MobGame): Player {
  const survivingMobPlayers = mobGame.mobPlayers.filter((mp) => mp.active);
  const mugWinner =
    survivingMobPlayers.length === 0 && mobGame.mugPlayer.lives > 0;
  const soleMobSurvivor =
    survivingMobPlayers.length === 1 ? survivingMobPlayers[0] : undefined;

  if (
    !(
      (mugWinner && player.id === mobGame.mugPlayer.playerId) ||
      (soleMobSurvivor && player.id === survivingMobPlayers[0].playerId)
    )
  ) {
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

export function pointsToPlayersKong(mobGame: MobGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    const mugPlayer = allPlayers.find(
      (p) => p.id === mobGame.mugPlayer.playerId
    );

    if (mugPlayer) {
      givePoints(
        giveWinnerBonus(mugPlayer, mobGame),
        mobGame.points.mugPlayer,
        log
      );
    }

    mobGame.points.mobPlayers.forEach((mobPlayerPoints) => {
      const mobPlayer = allPlayers.find(
        (p) => p.id === mobPlayerPoints.playerId
      );

      if (!mobPlayer) return;

      givePoints(
        giveWinnerBonus(mobPlayer, mobGame),
        mobPlayerPoints.points,
        log
      );
    });
  });
}
