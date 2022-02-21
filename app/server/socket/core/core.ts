import { Socket, Route, Post } from 'xioo';

// const {Route, Path} = Socket;

@Socket.Route('/core')
class Core extends Socket {
  @Socket.Path('test')
  user(socket, data) {
    console.green(data);
    socket.emit('user', '我是实时计算');
  }
}

export = Core;