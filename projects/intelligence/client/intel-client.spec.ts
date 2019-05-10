import { ConfigIntelServer, Depth, SupportedExchange, Ticker, Transaction } from '@dripjs/types';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ApplicationModule, IntelChannel } from '../../intelligence';
import { IntelClient } from './intel-client';

// tslint:disable-next-line
const config: ConfigIntelServer = require('config').container.intelService;

describe('intel-client', () => {
  let app: INestApplication;
  let client: IntelClient;
  const exchange = SupportedExchange.Bitmex;
  const pair = 'XBTUSD';

  beforeAll(async () => {
    const serverPort = config.port;
    const testingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();
    app = testingModule.createNestApplication();
    await app.listenAsync(serverPort);

    client = new IntelClient({
      ...config,
      ip: '127.0.0.1',
    });
  });

  afterAll(async () => {
    await app.close();
    client.disconnect();
  });

  it('getSymbols', async () => {
    const symbols = await client.getSymbols(exchange);
    expect(symbols.length).toBeGreaterThan(0);
  });

  it('tick$', (done) => {
    client.ticker$(exchange, pair).subscribe((res) => {
      expect(res.channel).toEqual(IntelChannel.Ticker);
      expect(res.data).toBeDefined();
      expect((<Ticker>res.data).ask).toBeGreaterThan(0);
      expect((<Ticker>res.data).bid).toBeGreaterThan(0);
      client.stopTicker(exchange, pair);
      done();
    });
  });

  it('depth$', (done) => {
    client.depth$(exchange, pair).subscribe((res) => {
      expect(res.channel).toEqual(IntelChannel.Depth);
      expect(res.data).toBeDefined();
      expect((<Depth>res.data).asks.length).toBeGreaterThan(20);
      expect((<Depth>res.data).bids.length).toBeGreaterThan(20);
      client.stopDepth(exchange, pair);
      done();
    });
  });

  it('transaction$', (done) => {
    client.transaction$(exchange, pair).subscribe((res) => {
      expect(res.channel).toEqual(IntelChannel.Transaction);
      expect(res.data).toBeDefined();
      expect((<Transaction>res.data).amount).toBeGreaterThan(0);
      expect((<Transaction>res.data).price).toBeGreaterThan(0);
      expect((<Transaction>res.data).time).toBeGreaterThan(0);
      client.stopTransaction(exchange, pair);
      done();
    });
  });
});
