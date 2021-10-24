import { Debugger } from 'debug';
import { playerService } from '../../services/player';
import { Player } from '../../services/player/types';
import {
  getIntegerAttributeValue,
  incrementIntegerTag,
} from '../../utils/tags';
import { MobGame, MobPlayerPoints } from './types';

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

export function pointsToPlayers(mobGame: MobGame, log: Debugger) {
  playerService.getPlayersAsync().then((allPlayers) => {
    const mugPlayer = allPlayers.find(
      (p) => p.id === mobGame.mugPlayer.playerId
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

    const allRacerPlayerIdsThisGame = [
      mobGame.mugPlayer.playerId,
      ...mobGame.mobPlayers.map((mp) => mp.playerId),
    ];

    console.log('MISSING RACERS', allRacerPlayerIdsThisGame);

    const racersMissingThisRace = allPlayers
      .filter((p) => p.tags.includes('racer'))
      .filter((p) => !allRacerPlayerIdsThisGame.includes(p.id));

    racersMissingThisRace.forEach((player) => {
      givePoints(player, 1, log);
    });
  });

  playerService.updatePlayerTags;
}
