import koa from 'koa';
import serve from 'koa-static';

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

app.io.on('connection', (socket) => {
  console.log('user connected!', socket.state);

  app.io.emit('msg', { for: 'me', ...initialState });
});

server.listen(3000);

console.log('listening on port 3000');
