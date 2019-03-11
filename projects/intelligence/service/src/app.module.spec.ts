import { INestApplication } from '@nestjs/common';
import { createNestTestApplication } from 'dripjs-common';
import { ConfigIntelServer, Symbol } from 'dripjs-types';
import * as io from 'socket.io-client';

import { ApplicationModule } from './app.module';
import { IntelErrorResponse, IntelGetSymbolsResponse } from './common';

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
    socket = io(`http://localhost:${serverPort}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            username: config.username,
            password: config.password,
          },
        },
      },
    });
  });

  afterAll(async () => {
    await app.close();
    socket.close();
  });

  it('getSymbols', async (done) => {
    socket.on('exception', (e: any) => {
      console.log(JSON.stringify(e));
    });
    socket.emit('symbols', 'bitmex', (res: IntelGetSymbolsResponse) => {
      expect(res.error).toBeUndefined();
      expect(res.symbols.length).toBeGreaterThan(0);
    });

    setTimeout(() => {
      done();
    }, 1000);
  });
});
