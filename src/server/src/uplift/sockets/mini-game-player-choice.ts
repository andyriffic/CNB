import { Socket, Server } from 'socket.io';
import shortid from 'shortid';
import { createLogger, LOG_NAMESPACE } from '../../utils/debug';

type Choice = {
  id: string;
  label: string;
};

type InitiatePlayerChoice = {
  playerId: string;
  tag?: string;
  maskLabels?: boolean;
  choices: Choice[];
};

type CreatedPlayerChoice = {
  id: string;
  selectedChoiceId: string | undefined;
} & InitiatePlayerChoice;

let _allChoices: CreatedPlayerChoice[] = [];

const SUBSCRIBE_TO_ALL_CHOICES = 'SUBSCRIBE_TO_ALL_CHOICES';
const INITIATE_CHOICE = 'INITIATE_CHOICE';
const SELECT_CHOICE = 'SELECT_CHOICE';
const PLAYER_CHOICE_UPDATE = 'PLAYER_CHOICE_UPDATE';
const PLAYER_CHOICE_DELETE = 'PLAYER_CHOICE_DELETE';

const log = createLogger('player-choice', LOG_NAMESPACE.socket);

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function (socket: Socket) {
    log('someone connected to player-choice', socket.id);

    socket.on(SUBSCRIBE_TO_ALL_CHOICES, () => {
      socket.emit(PLAYER_CHOICE_UPDATE, _allChoices);
    });

    socket.on(
      INITIATE_CHOICE,
      (
        initiateChoice: InitiatePlayerChoice,
        onCreated?: (choiceId: string) => void
      ) => {
        const newChoice: CreatedPlayerChoice = {
          ...initiateChoice,
          id: shortid.generate(),
          selectedChoiceId: undefined,
        };

        log('Choice created', newChoice);

        _allChoices = [
          ..._allChoices.filter((c) => c.playerId !== initiateChoice.playerId),
          newChoice,
        ];
        onCreated && onCreated(newChoice.id);
        namespace.emit(PLAYER_CHOICE_UPDATE, _allChoices);
      }
    );

    socket.on(SELECT_CHOICE, (choiceId: string, selectedId: string) => {
      const choice = _allChoices.find((c) => c.id === choiceId);

      if (!choice) {
        log(`No choice found for ${choiceId}`);
        return;
      }

      const updatedChoice = {
        ...choice,
        selectedChoiceId: selectedId,
      };

      _allChoices = [
        ..._allChoices.filter((c) => c.id !== choiceId),
        updatedChoice,
      ];

      // log('Player choice', updatedChoice);

      namespace.emit(PLAYER_CHOICE_UPDATE, _allChoices);
    });

    socket.on(PLAYER_CHOICE_DELETE, (playerId: string) => {
      log('Choice delete', playerId);

      _allChoices = [..._allChoices.filter((c) => c.playerId !== playerId)];
      namespace.emit(PLAYER_CHOICE_UPDATE, _allChoices);
    });
  });
};

export default init;
