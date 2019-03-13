import * as http from 'http';

import * as express from 'express';
import * as socketIO from 'socket.io';

import { SocketIORxjs } from './socketio-rxjs';

describe('SocketIORxjs', () => {
  let ioServer: socketIO.Server;
  let ioRxjs: SocketIORxjs;

  beforeEach(() => {
    const port = 8801;
    const app = express();
    const server = http.createServer(app);
    ioServer = socketIO(server).listen(port);
    ioRxjs = new SocketIORxjs(`http://localhost:${port}`);
  });

  afterEach(() => {
    ioRxjs.close();
    ioServer.close();
  });

  it('subscribe onopen', (done) => {
    const msg = {
      action: 'test',
    };
    ioRxjs.message$.subscribe((o) => {
      ioRxjs.send(['test', msg]);
      expect(o).toEqual(msg);
    });
    ioServer.on('connection', (ws) => {
      ws.send(msg);
    });
    setTimeout(() => {
      done();
    }, 500);
  });

  it('send message', (done) => {
    const msg = {
      action: 'test',
    };
    ioRxjs.message$.subscribe((o) => {
      ioRxjs.send(msg);
    });

    ioServer.on('connection', (ws) => {
      ws.send(msg);
      ws.on('message', (data) => {
        expect(data).toEqual(msg);
      });
    });
    setTimeout(() => {
      done();
    }, 500);
  });

  it('subscribe onmessage to exception', (done) => {
    ioServer.on('connection', (ws) => {
      ws.send('t');
    });
    setTimeout(() => {
      done();
    }, 500);
  });

  it('subscribe onerror', (done) => {
    ioServer.on('connection', () => {
      ioServer.emit('error', new Error('xxx erorr'));
    });
    setTimeout(() => {
      done();
    }, 500);
  });

  it('subscribe connect_timeout', (done) => {
    ioServer.on('connection', () => {
      ioServer.emit('connect_timeout', new Error('erorr: cant not connection'));
    });
    setTimeout(() => {
      done();
    }, 500);
  });

  it('subscribe connect_error', (done) => {
    const ws = new SocketIORxjs(`http://localhost:8801`);

    expect(ws).toBeDefined();
    setTimeout(() => {
      done();
    }, 500);
  });

  it('join room', (done) => {
    const roomName = 'event_room';
    const msg = {
      toEveryone: 'Hi',
    };
    const joinMsg = {
      name: 'jack',
    };

    ioRxjs.message$.subscribe((data) => {
      expect(data).toEqual(msg);
    });

    ioRxjs.emit('joinRoom', [roomName, joinMsg]);
    ioServer.on('connection', (ws) => {
      ws.on('joinRoom', (roomNm, data) => {
        ws.join(roomNm);
        expect(data).toEqual(joinMsg);
      });
    });
    setTimeout(() => {
      ioServer.to(roomName).emit('message', msg);
    }, 500);
    setTimeout(() => {
      done();
    }, 1000);
  });

  it('custom event', (done) => {
    const event = 'foo';
    const msg = {
      toEveryone: 'Hi',
    };
    ioRxjs.message$.subscribe((data) => {
      expect(data).toEqual('ok');
    });

    ioRxjs.emit(event, msg);
    ioServer.on('connection', (ws) => {
      ws.on(event, (data) => {
        ioServer.send('ok');
        expect(data).toEqual(msg);
      });
    });
    setTimeout(() => {
      done();
    }, 500);
  });
});
