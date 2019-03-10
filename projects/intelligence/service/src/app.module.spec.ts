import { INestApplication } from '@nestjs/common';
import { createNestTestApplication } from 'dripjs-common';
import { ConfigIntelServer, Symbol } from 'dripjs-types';
import * as io from 'socket.io-client';

import { ApplicationModule } from './app.module';
import { IntelErrorResponse, IntelGetSymbolsResponse } from './intel';

// tslint:disable-next-line
const config: ConfigIntelServer = require('config').container.intelService;

describe('app.module.events', () => {
  let app: INestApplication;
  let socket: SocketIOClient.Socket;

  beforeAll(async () => {
    const serverPort = config.port;
    app = await createNestTestApplication({
      imports: [ApplicationModule],
    });

    await app.listenAsync(serverPort);
    socket = io(`http://localhost:${serverPort}`);
  });

  afterAll(async () => {
    await app.close();
    socket.close();
  });

  describe('getSymbols', () => {
    it('simple non-depth ch', async (done) => {
      socket.emit('symbols', 'bitmex', (res: IntelGetSymbolsResponse) => {
        expect(res.error).toBeUndefined();
        expect(res.symbols.length).toBeGreaterThan(0);
      });

      setTimeout(() => {
        done();
      }, 5000);
    });
  });
});
