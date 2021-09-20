import {
  MobGame,
  MobPlayer,
  MoveId,
  MoveResult,
} from '../../sockets/mob-mode/types';
import { Player } from '../player/types';

export type MobStatsRecord = {
  date: string;
  mobGameId: string;
  gameType: string;
  playerId: string;
  playerName: string;
  inMob: boolean;
  roundNumber: number;
  moveId: MoveId;
  opponentMoveId?: MoveId;
  result?: MoveResult;
};

export const mapMobGameToStats = (
  mobGame: MobGame,
  allPlayers: Player[]
): MobStatsRecord[] => {
  const mugPlayer = allPlayers.find(
    (p) => p.id === mobGame.mugPlayer.playerId
  )!;

  const mugStatsRecord: MobStatsRecord = {
    date: new Date().toISOString(),
    mobGameId: mobGame.id,
    gameType: mobGame.gameType,
    playerId: mobGame.mugPlayer.playerId,
    playerName: mugPlayer.name,
    inMob: false,
    roundNumber: mobGame.round,
    moveId: mobGame.mugPlayer.lastMoveId!,
  };

  const mobStatsRecords = mobGame.mobPlayers
    .filter((mp) => mp.lastRound === mobGame.round)
    .map<MobStatsRecord>((mobPlayer) => {
      const player = allPlayers.find((p) => p.id === mobPlayer.playerId)!;
      return {
        date: new Date().toISOString(),
        mobGameId: mobGame.id,
        gameType: mobGame.gameType,
        playerId: mobPlayer.playerId,
        playerName: player.name,
        inMob: true,
        roundNumber: mobGame.round,
        moveId: mobPlayer.lastMoveId!,
        opponentMoveId: mobGame.mugPlayer.lastMoveId!,
        result: mobPlayer.lastMoveResult,
      };
    });

  return [mugStatsRecord, ...mobStatsRecords];
};
