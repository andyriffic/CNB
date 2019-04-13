import { incomingMessageTypes } from '../messages/typeConstants';
import connectionEstablishedMessage from '../messages/connectionEstablishedMessage';
import receiveMessage from '../receiveMessage';

const PATH = '/game';
const EVENT_MESSAGE_RECEIVED = 'MESSAGE_RECIEVED';

const init = (socketIo, store, userNamespace) => {
  const namespace = socketIo.of(PATH);

  const sendMessage = socket => message => {
    console.log('sendMessage', message);

    if (message.recipients && message.recipients.all) {
      socket.broadcast.emit(message.type, message.payload);
    }

    socket.emit(message.type, message.payload);
  };

  namespace.on('connection', function(socket) {
    console.log('user connected!', socket.id);
    userNamespace.userConnected(socket.id);

    sendMessage(socket)(connectionEstablishedMessage(socket.id));

    Object.keys(incomingMessageTypes).forEach(function(key) {
      console.log(key, incomingMessageTypes[key]);

      socket.on(incomingMessageTypes[key], msg => {
        console.log(EVENT_MESSAGE_RECEIVED, msg);

        receiveMessage(store, msg, sendMessage(socket));

        // console.log('STATE: ', store.getState());
      });
    });

    socket.on('disconnect', function() {
      console.log('Got disconnect!', socket.id);
      userNamespace.userDisconnected(socket.id);
    });
  });
};

export default init;
