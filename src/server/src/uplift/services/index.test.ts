import { assert } from 'chai';
import { playerService } from './player';
import { TeamList } from './player/types';
import { matchupService } from './matchup';
import { getGameStatus } from './matchup/gameStatus';
import { gameResultService } from './game-result';
import { GAME_MOVE } from './game-result/types';
import { counterService } from '../services/counter';

describe('game scenarios', () => {
  it('runs game scenario test', done => {
    playerService.getPlayersAsync().then(players => {
      assert.isNotNull(players);
      assert(players.length > 0);
      done();
    });
  });

  it('plays full game', () => {
    const allTeams = playerService.getAllTeams();
    const c1 = counterService.createCounter('c1');
    const c2 = counterService.createCounter('c2');
    const t1 = counterService.createCounter('t1');
    const t2 = counterService.createCounter('t2');
    const matchup = matchupService.createTeamMatchup(
      'test_matchup_id',
      [allTeams[0].id, allTeams[1].id],
      [c1.id, c2.id],
      [t1.id, t2.id],
      2,
      'theme'
    );
    let game = matchupService.createGame(
      'test_game_id',
      matchup.teamIds,
      false
    );

    console.log('GAME STATUS', getGameStatus(game));

    game = matchupService.updateTeamMove(game, allTeams[0].id, {
      playerId: 'them',
      moveId: GAME_MOVE.A,
      powerUpId: 'NONE',
    });

    console.log('GAME STATUS', getGameStatus(game));

    game = matchupService.updateTeamMove(game, allTeams[1].id, {
      playerId: 'they',
      moveId: GAME_MOVE.B,
      powerUpId: 'NONE',
    });

    console.log('GAME RESULT', game);
    console.log('GAME STATUS', getGameStatus(game));

    console.log(
      'WINNER',
      gameResultService.getWinner([
        game.moves[0].moveId!,
        game.moves[1].moveId!,
      ])
    );
  });
});
