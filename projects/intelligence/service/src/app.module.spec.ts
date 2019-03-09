import { INestApplication } from '@nestjs/common';
import { createNestTestApplication } from 'dripjs-common';
import { ConfigIntelServer } from 'dripjs-types';
import * as io from 'socket.io-client';

import { ApplicationModule } from './app.module';

// tslint:disable-next-line
const config: ConfigIntelServer = require('config').container.intelService;

describe('app.module.events', () => {
  let app: INestApplication;
  let socket: SocketIOClient.Socket;
  const serverPort = config.port;

  afterEach(async () => {
    await app.close();
    socket.close();
  });

  describe(`event: join-room (initial data)`, () => {
    it('simple non-depth ch', async (done) => {
      app = await createNestTestApplication({
        imports: [ApplicationModule],
      });

      await app.listenAsync(serverPort);

      socket = io(`http://localhost:${serverPort}`);
      socket.emit('symbols', 'bitmex', (res: any) => {
        console.log(res);
      });
      /*socket.emit('events', { test: 'test' });
      socket.on('events', (data: any) => {
          console.log('event', data);
      });*/

      setTimeout(() => {
        done();
      }, 50000);
      // expect(joinRoomRes).toEqual({ room_name: 'transactions_btc_jpy', message: 'ok getLatestEmittedMessage' });
    });
  });
});
