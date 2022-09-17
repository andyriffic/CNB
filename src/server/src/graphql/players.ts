import { playersDatastore } from '../uplift/datastore/players';
import { Player } from '../uplift/services/player/types';

export const query = `players: [Player]`;

export const schema = `
    type Player {
      id: String!
      name: String!
    }
`;

export const resolver = (): Promise<Player[]> => {
  return new Promise<Player[]>((resolve, reject) => {
    playersDatastore
      .getAllPlayers()
      .then((allPlayers) => {
        resolve(allPlayers.filter((p) => p.id !== 'mc_settings_face'));
      })
      .catch(() => reject());
  });
};
