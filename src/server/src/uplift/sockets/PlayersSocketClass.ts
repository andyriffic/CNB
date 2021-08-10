import { Debugger } from 'debug';
import { Namespace, Server, Socket } from 'socket.io';
import { PlayersDataStore } from '../datastore/players';
import { Player } from '../services/player/types';

export class PlayersSocket {
  private _namespace: Namespace;
  private _playersDataStore: PlayersDataStore;
  private _logger: Debugger;

  constructor(
    namespace: Namespace,
    playersDataStore: PlayersDataStore,
    logger: Debugger
  ) {
    this._namespace = namespace;
    this._playersDataStore = playersDataStore;
    this._logger = logger;

    namespace.on('connection', (socket: Socket) => {
      socket.on('ADD_PLAYER', this.addPlayer);
    });
  }

  private emitPlayersUpdate(): void {
    this._playersDataStore.getAllPlayers().then((playerList) => {
      //this.#socket.emit('ALL_PLAYERS_UPDATE', playerList);
    });
  }

  private addPlayer(id: string, name: string) {
    this._logger('addPlayer', id, name);
    const player: Player = {
      id,
      name,
      avatarImageUrl: '-',
      tags: [],
    };

    this._playersDataStore.addPlayer(player).then(() => {
      this.emitPlayersUpdate();
    });
  }
}
