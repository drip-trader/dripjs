import { isPositive, sleep } from '@dripjs/common';
import { assertExisitingColumns, isOrderSide, overrideTimestampColumns, overrideValue } from '@dripjs/testing';
import { Bar, ConfigIntelServer, SupportedExchange, Symbol } from '@dripjs/types';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as io from 'socket.io-client';

import { Resolution } from '../core';
import { ApplicationModule } from './app.module';
import { IntelChannel, IntelRealtimeResponse } from './types';

// tslint:disable-next-line
const config: ConfigIntelServer = require('config').container.intelService;

describe('app.module', () => {
  let app: INestApplication;
  let socket: SocketIOClient.Socket;
  const exchange = SupportedExchange.Bitmex;
  const symbol = 'XBTUSD';

  beforeAll(async () => {
    const serverPort = config.port + 1;
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

  it('getSymbols', async () => {
    let data: Symbol[] = [];
    socket.emit('symbols', exchange, (symbols: Symbol[]) => (data = symbols));
    await sleep(3000);
    expect(data.length).toBeGreaterThan(10);
  });

  it('getBars', async () => {
    const resolution = Resolution.day;
    const end = Date.now();
    const start = end - 1000 * 60 * 60 * 24 * 60;
    let data: Bar[] = [];
    socket.emit('bars', { exchange, symbol, resolution, start, end }, (bars: Bar[]) => (data = bars));
    await sleep(3000);
    expect(data.length).toEqual(60);
  });

  describe('subscribe', () => {
    it('ticker', async () => {
      let data: IntelRealtimeResponse;
      const channel = IntelChannel.Ticker;
      socket.on(channel, (res: IntelRealtimeResponse) => (data = res));
      socket.emit('subscribe', { exchange, symbol, channel });
      await sleep(3000);
      expect(() =>
        assertExisitingColumns(overrideTimestampColumns(data), {
          channel,
          data: {
            ask: isPositive,
            bid: isPositive,
            high: 0,
            low: 0,
            last: isPositive,
            volume: isPositive,
            time: overrideValue,
          },
        }),
      ).not.toThrow();
      socket.emit('unsubscribe', { exchange, symbol, channel });
    });

    it('depth', async () => {
      let data: IntelRealtimeResponse;
      const channel = IntelChannel.Depth;
      socket.on(channel, (res: IntelRealtimeResponse) => (data = res));
      socket.emit('subscribe', { exchange, symbol, channel });
      await sleep(3000);
      expect(() =>
        assertExisitingColumns(overrideTimestampColumns(data), {
          channel,
          data: {
            asks: [[isPositive, isPositive]],
            bids: [[isPositive, isPositive]],
          },
        }),
      ).not.toThrow();
      socket.emit('unsubscribe', { exchange, symbol, channel });
    });

    it('transaction', async () => {
      let data: IntelRealtimeResponse;
      const channel = IntelChannel.Transaction;
      socket.on(channel, (res: IntelRealtimeResponse) => (data = res));
      socket.emit('subscribe', { exchange, symbol, channel });
      await sleep(3000);
      expect(() =>
        assertExisitingColumns(overrideTimestampColumns(data), {
          channel,
          data: {
            time: overrideValue,
            side: isOrderSide,
            price: isPositive,
            amount: isPositive,
          },
        }),
      ).not.toThrow();
      socket.emit('unsubscribe', { exchange, symbol, channel });
    });
  });
});
