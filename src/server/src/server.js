import 'babel-polyfill';

import createStore from './store/createStore';
import reducer from './state/reducer';

import initUserNamespace from './socket-namespaces/clients';
import initGameNamespace from './socket-namespaces/game';
import initStats from './socket-namespaces/stats';
import initPlayers from './socket-namespaces/players';
import initTheme from './socket-namespaces/theme';
import initMatchupsSocket from './uplift/sockets/matchup-admin';
import initMatchupsSocketForRealz from './uplift/sockets/matchups';
import initGameSocket from './uplift/sockets/game';
import initPlayersSocket from './uplift/sockets/players';
import initThemes from './uplift/sockets/theme';
import initTeams from './uplift/sockets/teams';
import initInvitations from './uplift/sockets/invitations';
import initPlayerChoice from './uplift/sockets/mini-game-player-choice';
import initMobMode from './uplift/sockets/mob-mode/socket'

import {graphql} from './graphql';
import { StatsService } from './uplift/services/stats';

const store = createStore(reducer);

const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const port = process.env.PORT || 3000;
server.listen(port);


var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, './static')));
app.use(express.json());

app.post('/racing-history', (req, res) => {
  console.log('GOT RACING DATA', req.body);
  StatsService.saveRacingHistory(req.body.gameId, req.body.stats)
  // res.end()
})

app.get('/test', (req, res) => {
  console.log('TEST');
  res.sendStatus(200)
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});


app.use('/graphql', graphql);

const userNamespace = initUserNamespace(io);
initGameNamespace(io, store, userNamespace);
initStats(io);
initPlayers(io);
initTheme(io);
initGameSocket(io, '/games');
initMatchupsSocket(io, '/matchups');

initMatchupsSocketForRealz(io, '/matchups-realz');
initPlayersSocket(io, '/players-realz');
initThemes(io, '/theme-realz');
initTeams(io, '/teams-realz');
initInvitations(io, '/invitations');
initPlayerChoice(io, 'player-choice');
initMobMode(io, '/mob-mode')

console.log(`App running on http://localhost:${port}`);


console.log(`Publishing Mob stats`);
StatsService.publishMobSummaryStats()
