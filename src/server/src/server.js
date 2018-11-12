import 'babel-polyfill';


import { incomingMessageTypes } from './messages/typeConstants';
import connectionEstablishedMessage from './messages/connectionEstablishedMessage';

import createStore from './store/createStore';
import reducer from './state/reducer';

import receiveMessage from './receiveMessage';

const store = createStore(reducer);

const sendMessage = (socket) => (message) => {
  console.log('sendMessage', message);

  if (message.recipients && message.recipients.all) {
    socket.broadcast.emit(message.type, message.payload);
  }

  socket.emit(message.type, message.payload);

};

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const port = process.env.PORT || 3000;
server.listen(port);

app.use(express.static(path.join(__dirname, '/../client')));
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

io.on('connection', function (socket) {
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

console.log(`App running on http://localhost:${port}`);
