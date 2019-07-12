import { incomingMessageTypes } from '../messages/typeConstants';
import connectionEstablishedMessage from '../messages/connectionEstablishedMessage';
import receiveMessage from '../receiveMessage';

const PATH = '/game';
const EVENT_MESSAGE_RECEIVED = 'MESSAGE_RECIEVED';

const sendMessage = socket => message => {
  // console.log('sendMessage', message);

  if (message.recipients && message.recipients.all) {
    socket.broadcast.emit(message.type, message.payload);
  }

  socket.emit(message.type, message.payload);
};

const init = (socketIo, store, clientsSrv) => {
  const namespace = socketIo.of(PATH);

  namespace.on('connection', function(socket) {
    // console.log('user connected!', socket.id);
    // console.log('user handshake headers', socket.handshake.headers);
    // console.log('user headers', socket.headers);
    clientsSrv.userConnected(socket.id, socket.handshake.headers['user-agent']);

    sendMessage(socket)(connectionEstablishedMessage(socket.id));

    Object.keys(incomingMessageTypes).forEach(function(key) {
      // console.log(key, incomingMessageTypes[key]);

      socket.on(incomingMessageTypes[key], msg => {
        // console.log(EVENT_MESSAGE_RECEIVED, msg);

        receiveMessage(store, msg, sendMessage(socket));

        // console.log('STATE: ', store.getState());
      });
    });

    socket.on('disconnect', function() {
      // console.log('Got disconnect!', socket.id);
      clientsSrv.userDisconnected(socket.id);
    });
  });
};

export default init;
