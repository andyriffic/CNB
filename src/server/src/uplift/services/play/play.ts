import { TeamMatchup, Game } from '../game/types';
import { games } from '../game';

const melbXianMatchup: TeamMatchup = {
  id: 'melb+xian',
  teamIds: ['melb', 'xian'],
};

let teamMatchups: TeamMatchup[] = [melbXianMatchup];
let gamesInProgress: { [matchupId: string]: Game } = {};

const requestGameForMatchupAsync = (matchupId: string): Promise<Game> => {
  const promise = new Promise<Game>((resolve, reject) => {
    const existingGame = gamesInProgress[matchupId];

    if (existingGame) {
      return resolve(existingGame);
    }

    const matchup = teamMatchups.find(mu => mu.id === matchupId);
    if (!matchup) {
      return reject(`Matchup for id ${matchupId} does not exist`);
    }

    games.createGameForMatchupAsync(matchup.teamIds).then(game => {
      gamesInProgress = {
        ...gamesInProgress,
        [matchupId]: game,
      };
      return resolve(game);
    });
  });

  return promise;
};

export default {
  requestGameForMatchupAsync,
};
