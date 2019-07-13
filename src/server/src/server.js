import 'babel-polyfill';

import createStore from './store/createStore';
import reducer from './state/reducer';

import initUserNamespace from './socket-namespaces/clients';
import initGameNamespace from './socket-namespaces/game';
import initStats from './socket-namespaces/stats';
import initPlayers from './socket-namespaces/players';
import initTheme from './socket-namespaces/theme';
import initMatchupsSocket from './uplift/sockets/matchup';
import initGameSocket from './uplift/sockets/game';

const store = createStore(reducer);

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const port = process.env.PORT || 3000;
server.listen(port);


app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, './static')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

const userNamespace = initUserNamespace(io);
initGameNamespace(io, store, userNamespace);
initStats(io);
initPlayers(io);
initTheme(io);
initMatchupsSocket(io, '/matchups');
initGameSocket(io, '/games');


console.log(`App running on http://localhost:${port}`);
