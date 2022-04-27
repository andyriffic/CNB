import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import {
  getIntegerAttributeValue,
  incrementIntegerTag,
} from '../../utils/tags';
import { MobGame, MobPlayerPoints } from './types';

function givePowerPill(player: Player): Player {
  return {
    ...player,
    tags: [...player.tags.filter((t) => t !== 'pac_pill'), 'pac_pill'],
  };
}

function releaseFromJail(player: Player): Player {
  return {
    ...player,
    tags: [
      ...player.tags.filter((t) => !t.startsWith('pac_jail:')),
      'pac_jail:1',
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

  const jailTurnsRemaining = getIntegerAttributeValue(
    player.tags,
    'pac_jail',
    0
  );

  if (jailTurnsRemaining <= 1) {
    return givePowerPill(player);
  } else {
    return releaseFromJail(player);
  }
}

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

export function pointsToPlayersPacman(mobGame: MobGame, log: Debugger) {
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
