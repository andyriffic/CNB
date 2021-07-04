import {
  MobGame,
  MobPlayer,
  MoveId,
  MoveResult,
} from '../../sockets/mob-mode/types';

export type MobStatsRecord = {
  date: string;
  mobGameId: string;
  playerId: string;
  playerName: string;
  inMob: boolean;
  roundNumber: number;
  moveId: MoveId;
  opponentMoveId?: MoveId;
  result?: MoveResult;
};

export const mapMobGameToStats = (mobGame: MobGame): MobStatsRecord[] => {
  const mugStatsRecord: MobStatsRecord = {
    date: new Date().toISOString(),
    mobGameId: mobGame.id,
    playerId: mobGame.mugPlayer.player.id,
    playerName: mobGame.mugPlayer.player.name,
    inMob: false,
    roundNumber: mobGame.round,
    moveId: mobGame.mugPlayer.lastMoveId!,
  };

  const mobStatsRecords = mobGame.mobPlayers
    .filter((mp) => mp.lastRound === mobGame.round)
    .map<MobStatsRecord>((mobPlayer) => ({
      date: new Date().toISOString(),
      mobGameId: mobGame.id,
      playerId: mobPlayer.player.id,
      playerName: mobPlayer.player.name,
      inMob: true,
      roundNumber: mobGame.round,
      moveId: mobPlayer.lastMoveId!,
      opponentMoveId: mobGame.mugPlayer.lastMoveId!,
      result: mobPlayer.lastMoveResult,
    }));

  return [mugStatsRecord, ...mobStatsRecords];
};
