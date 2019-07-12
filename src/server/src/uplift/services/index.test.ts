import { assert } from 'chai';
import { players, teams } from './player';
import { TeamList } from './player/types';
import { games } from './matchup';
import { getGameStatus } from './matchup/gameStatus';
import { gameResult } from './game-result';
import { GAME_MOVE } from './game-result/types';

describe('game scenarios', () => {
  it('runs game scenario test', done => {
    players.getPlayersAsync().then(players => {
      assert.isNotNull(players);
      assert(players.length > 0);
      done();
    });
  });

  it('plays full game', () => {
    let allTeams: TeamList;
    Promise.all([
      teams.getAllTeamsAsync().then(teams => {
        allTeams = teams;
      }),
    ]).then(() => {
      const matchup = games.createTeamMatchup('test_matchup_id', [
        allTeams[0].id,
        allTeams[1].id,
      ]);
      let game = games.createGame('test_game_id', matchup.teamIds);

      console.log('GAME STATUS', getGameStatus(game));

      game = games.updateTeamMove(game, allTeams[0].id, {
        playerId: 'them',
        moveId: GAME_MOVE.A,
        powerUpId: 'NONE',
      });

      console.log('GAME STATUS', getGameStatus(game));

      game = games.updateTeamMove(game, allTeams[1].id, {
        playerId: 'they',
        moveId: GAME_MOVE.B,
        powerUpId: 'NONE',
      });

      console.log('GAME RESULT', game);
      console.log('GAME STATUS', getGameStatus(game));

      console.log(
        'WINNER',
        gameResult.getWinner([game.moves[0].moveId!, game.moves[1].moveId!])
      );
    });
  });
});
