import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import {
  getIntegerAttributeValue,
  incrementIntegerTag,
} from '../../utils/tags';
import { GasGame } from './types';

function givePoints(player: Player, points: number, log: Debugger): void {
  const finishPlacing = getIntegerAttributeValue(player.tags, 'rt_finish', 0);

  if (finishPlacing > 0) {
    log('No points for finished place', player.id, finishPlacing);
    return;
  }

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

export function pointsToPlayers(game: GasGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    game.allPlayers.forEach((gasPlayer) => {
      givePoints(gasPlayer.player, gasPlayer.points, log);
    });

    const allRacerPlayerIdsThisGame = game.allPlayers.map((gp) => gp.player.id);

    log('RACERS THIS GAME', allRacerPlayerIdsThisGame);

    const racersMissingThisRace = allPlayers
      .filter((p) => p.tags.includes('racer'))
      .filter((p) => !allRacerPlayerIdsThisGame.includes(p.id));

    log(
      'MISSING RACERS',
      racersMissingThisRace.map((p) => p.id)
    );

    racersMissingThisRace.forEach((player) => {
      givePoints(player, 1, log);
    });
  });

  playerService.updatePlayerTags;
}
