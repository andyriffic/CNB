const PATH = '/users';
const EVENT_USER_UPDATE = 'USER_UPDATE';

const init = (socketIo) => {
  let users = [];

  const namespace = socketIo.of(PATH);
  namespace.on('connection', function(socket) {
    console.log('someone connected to users', socket.id); //socket.request._query
    socket.emit(EVENT_USER_UPDATE, users);
  });

  return {
    userConnected: username => {
      console.log('======USER CONNECTED=======', PATH, users);
      users = [...users, username];
      socketIo.of(PATH).emit(EVENT_USER_UPDATE, users);
    },
    userDisconnected: username => {
      console.log('======USER DISCONNECTED=======', PATH, users);
      users = users.filter(user => user !== username);
      socketIo.of(PATH).emit(EVENT_USER_UPDATE, users);
    },
  };
};

export default init;
