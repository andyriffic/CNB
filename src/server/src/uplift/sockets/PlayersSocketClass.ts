import { Debugger } from 'debug';
import { Namespace, Socket } from 'socket.io';
import { PlayersDataStore } from '../datastore/players';
import { Player } from '../services/player/types';

export interface IPlayersSocketService {
  addPlayer: (id: string, name: string) => void;
  updatePlayer: (id: string, tags: string[], onUpdated?: () => void) => void;
}

export class PlayersSocketService implements IPlayersSocketService {
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
      socket.on('UPDATE_PLAYER', this.updatePlayer);
    });
  }

  private emitPlayersUpdate(): void {
    this._playersDataStore.getAllPlayers().then((playerList) => {
      this._namespace.emit('ALL_PLAYERS_UPDATE', playerList);
    });
  }

  public addPlayer(id: string, name: string) {
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

  public updatePlayer(
    id: string,
    tags: string[],
    onUpdated?: () => void
  ): void {
    this._logger('updatePlayer', id, tags);
    this._playersDataStore.getPlayer(id).then((player) => {
      const updatedPlayer = {
        ...player,
        tags,
      };
      this._playersDataStore.updatePlayerTags(updatedPlayer).then(() => {
        this.emitPlayersUpdate();
        onUpdated && onUpdated();
      });
    });
  }
}
