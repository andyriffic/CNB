import 'babel-polyfill';

import createStore from './store/createStore';
import reducer from './state/reducer';

import initUserNamespace from './socket-namespaces/clients';
import initGameNamespace from './socket-namespaces/game';
import initStats from './socket-namespaces/stats';

const store = createStore(reducer);

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const port = process.env.PORT || 3000;
server.listen(port);


app.use(express.static(path.join(__dirname, '/../client')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

const userNamespace = initUserNamespace(io);
initGameNamespace(io, store, userNamespace);
initStats(io);

console.log(`App running on http://localhost:${port}`);
