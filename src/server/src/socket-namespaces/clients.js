const PATH = '/clients';
const EVENT_USER_UPDATE = 'USER_UPDATE';

const init = (socketIo) => {
  let users = {};

  const namespace = socketIo.of(PATH);
  namespace.on('connection', function(socket) {
    console.log('someone connected to users', socket.id); //socket.request._query
    socket.emit(EVENT_USER_UPDATE, users);
  });

  return {
    userConnected: (clientId, userAgent) => {
      console.log('======USER CONNECTED=======', PATH, users);
      users = {...users, [clientId]: {userAgent}};
      socketIo.of(PATH).emit(EVENT_USER_UPDATE, users);
    },
    userDisconnected: clientId => {
      console.log('======USER DISCONNECTED=======', PATH, users);
      if (!users[clientId]) {
        console.log('Disconnecting clientId but not found :/', clientId);
        return;
      }
      delete users[clientId];
      users = {
        ...users,
      };
      socketIo.of(PATH).emit(EVENT_USER_UPDATE, users);
    },
  };
};

export default init;
