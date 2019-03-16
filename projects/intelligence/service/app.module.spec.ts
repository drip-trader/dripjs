import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigIntelServer, Depth, SupportedExchange, Symbol, Ticker, Transaction } from 'dripjs-types';
import * as io from 'socket.io-client';

import { ApplicationModule } from './app.module';
import { IntelChannel, IntelRealtimeResponse } from './common';

// tslint:disable-next-line
const config: ConfigIntelServer = require('config').container.intelService;

describe('app.module', () => {
  let app: INestApplication;
  let socket: SocketIOClient.Socket;
  const exchange = SupportedExchange.Bitmex;

  beforeAll(async () => {
    const serverPort = config.port;
    const testingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();
    app = testingModule.createNestApplication();
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
    socket.emit('symbols', exchange, (symbols: Symbol[]) => {
      expect(symbols.length).toBeGreaterThan(0);
      done();
    });
  });

  describe.skip('subscribe', () => {
    const pair = 'XBTUSD';

    afterAll(async () => {});

    it('ticker', (done) => {
      try {
        const channel = IntelChannel.Ticker;
        socket.on('tick', (res: IntelRealtimeResponse) => {
          expect(res.channel).toEqual(channel);
          expect(res.data).toBeDefined();
          expect((<Ticker>res.data).ask).toBeGreaterThan(0);
          expect((<Ticker>res.data).bid).toBeGreaterThan(0);
          socket.emit('unsubscribe', exchange, pair, channel);
          done();
        });
        socket.emit('subscribe', exchange, pair, channel);
      } catch (e) {
        console.error(e.message);
      }
    });

    it('depth', (done) => {
      const channel = IntelChannel.Depth;
      socket.on('depth', (res: IntelRealtimeResponse) => {
        expect(res.channel).toEqual(channel);
        expect(res.data).toBeDefined();
        expect((<Depth>res.data).asks.length).toBeGreaterThan(20);
        expect((<Depth>res.data).bids.length).toBeGreaterThan(20);
        socket.emit('unsubscribe', exchange, pair, channel);
        done();
      });
      socket.emit('subscribe', exchange, pair, channel);
    });

    it('transaction', (done) => {
      const channel = IntelChannel.Transaction;
      socket.on('transaction', (res: IntelRealtimeResponse) => {
        expect(res.channel).toEqual(channel);
        expect(res.data).toBeDefined();
        expect((<Transaction>res.data).amount).toBeGreaterThan(0);
        expect((<Transaction>res.data).price).toBeGreaterThan(0);
        expect((<Transaction>res.data).time).toBeGreaterThan(0);
        socket.emit('unsubscribe', exchange, pair, channel);
        done();
      });
      socket.emit('subscribe', exchange, pair, channel);
    });
  });
});
