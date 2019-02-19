import * as WebSocket from 'ws';

import { WebSocketRxJs } from './websocket-rxjs';

describe('WebSocketRxJs', () => {
  let wsServer: WebSocket.Server;
  let wsRxjs: WebSocketRxJs;

  beforeEach(() => {
    wsServer = new WebSocket.Server({ port: 8800 });
    wsRxjs = new WebSocketRxJs('ws://127.0.0.1:8800');
  });

  it('subscribe onopen', (done) => {
    const msg = {
      action: 'test',
    };
    wsRxjs.message$.subscribe((o) => {
      expect(o).toEqual(msg);
    });
    wsServer.on('connection', (ws) => {
      ws.send(JSON.stringify(msg));
    });
    setTimeout(() => {
      wsRxjs.close();
      wsServer.close();
      done();
    }, 1000);
  });
  it('subscribe onmessage to exception', (done) => {
    wsServer.on('connection', (ws) => {
      ws.send('t');
    });
    setTimeout(() => {
      wsRxjs.close();
      wsServer.close();
      done();
    }, 1000);
  });
  it('subscribe onclose', (done) => {
    wsServer.close();
    setTimeout(() => {
      done();
    }, 1000);
  });
  it('subscribe onerror', (done) => {
    const ws = new WebSocketRxJs('ws://127.0.0.1:8801');
    expect(ws).toBeDefined();
    setTimeout(() => {
      wsRxjs.close();
      wsServer.close();
      done();
    }, 1000);
  });
});
