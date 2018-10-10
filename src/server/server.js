import 'babel-polyfill';

import koa from 'koa';
import serve from 'koa-static';

import { incomingMessageTypes } from './messages/typeConstants';
import connectionEstablishedMessage from './messages/connectionEstablishedMessage';

import createStore from './store/createStore';
import reducer from './state/reducer';

import receiveMessage from './receiveMessage';

const store = createStore(reducer);

const app = new koa();

const initialState = {
  foo: 'bar',
};

app.use(serve('lib/client'));

var server = require('http').createServer(app.callback());
app.io = require('socket.io')(server);

app.context.state = initialState;

app.io.use((socket, next) => {
  socket.state = app.context.state;
  return next();
});

const sendMessage = (socket) => (message) => {
  console.log('sendMessage', message);

  if (message.recipients && message.recipients.all) {
    socket.broadcast.emit(message.type, message.payload);
  }

  socket.emit(message.type, message.payload);

};

app.io.on('connection', (socket) => {
  console.log('user connected!', socket.id);

  sendMessage(socket)(connectionEstablishedMessage(socket.id));

  Object.keys(incomingMessageTypes).forEach(function(key) {
    console.log(key, incomingMessageTypes[key]);

    socket.on(incomingMessageTypes[key], (msg) => {
      console.log('MESSAGE_RECIEVED', msg);

      receiveMessage(store, msg, sendMessage(socket));

      console.log('STATE: ', store.getState());
    });
  });
});

server.listen(3000);

console.log('listening on port 3000');
