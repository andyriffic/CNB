import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import {
  getIntegerAttributeValue,
  incrementIntegerTag,
} from '../../utils/tags';
import { GasGame } from './types';

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

function giveWinnerBonus(player: Player, game: GasGame): Player {
  if (player.id !== game.winningPlayerId) {
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

export function pointsToPlayersPacman(game: GasGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    game.allPlayers.forEach((gasPlayer) => {
      const player = allPlayers.find((p) => p.id === gasPlayer.player.id);

      if (!player) return;

      givePoints(giveWinnerBonus(player, game), gasPlayer.points, log);
    });
  });
}
