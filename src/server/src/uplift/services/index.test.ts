import { assert } from 'chai';
import { players, teams } from './player';
import { TeamList } from './player/types';
import { games } from './game';
import { TeamMatchup } from './game/types';

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
      games
        .createTeamMatchupAsync([allTeams[0].id, allTeams[1].id])
        .then(matchup => {
          console.log('MATCHUP', matchup);
          games.createGameForMatchupAsync(matchup).then(game => {
            console.log('GAME', game);
            games
              .updateTeamMoveAsync(game, allTeams[0].id, {
                playerId: 'them',
                moveId: 'A',
                powerUpId: 'NONE',
              })
              .then(updatedGame => {
                console.log('UPDATED GAME', updatedGame);
                games
                  .updateTeamMoveAsync(updatedGame, allTeams[1].id, {
                    playerId: 'they',
                    moveId: 'B',
                    powerUpId: 'NONE',
                  })
                  .then(updatedGame => {
                    console.log('UPDATED GAME', updatedGame);
                  });
              });
          });
        });
    });
  });
});
