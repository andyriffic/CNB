const PATH = '/game';
const THEME_UPDATE = 'THEME_UPDATE';

const theme = {
  id: 'ppp',
  name: 'Pizza, Panda, Pirate',
  moves: [
    {
      id: 'A',
      name: 'Pizza',
      imagePath: '/theme/ppp/pizza.png',
    },
    {
      id: 'B',
      name: 'Panda',
      imagePath: '/theme/ppp/panda.png',
    },
    {
      id: 'C',
      name: 'Pirate',
      imagePath: '/theme/ppp/pirate.png',
    },
  ],
};

const init = socketIo => {
  // const gameHistory = {};
  const namespace = socketIo.of(PATH);

  namespace.on('connection', function(socket) {
    // console.log('someone connected to theme', socket.id);
    socket.emit(THEME_UPDATE, theme);
  });
};

export default init;
