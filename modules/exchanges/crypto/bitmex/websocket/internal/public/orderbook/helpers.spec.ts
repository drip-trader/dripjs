import { getChannelName } from '../../../../common';
import { OrderbookResponse } from '../../../../types';
import { PublicEndPoints } from '../../../types';
import { WebsocketData } from '../../websocket-insider';
import { transform, update } from './helpers';

describe('BitmexWS orderbook helpers', () => {
  let originSource: WebsocketData<OrderbookResponse>;

  beforeEach(() => {
    originSource = {
      table: 'orderBookL2_25',
      action: 'partial',
      keys: ['symbol', 'id', 'side'],
      types: {
        symbol: 'symbol',
        id: 'long',
        side: 'symbol',
        size: 'long',
        price: 'float',
      },
      foreignKeys: {
        symbol: 'instrument',
        side: 'side',
      },
      attributes: {
        symbol: 'grouped',
        id: 'sorted',
      },
      filter: {
        symbol: 'XBTUSD',
      },
      data: [
        {
          symbol: 'XBTUSD',
          id: 15599619150,
          side: 'Sell',
          size: 1906,
          price: 3808.5,
        },
        {
          symbol: 'XBTUSD',
          id: 15599619200,
          side: 'Sell',
          size: 290238,
          price: 3808,
        },
        {
          symbol: 'XBTUSD',
          id: 15599619200,
          side: 'Buy',
          size: 290238,
          price: 3808,
        },
      ],
    };
  });

  it('orderbook update: action=insert', () => {
    const insertData: WebsocketData<OrderbookResponse> = {
      table: 'orderBookL2_25',
      action: 'insert',
      data: [
        {
          symbol: 'XBTUSD',
          id: 15599619160,
          side: 'Sell',
          size: 3000,
          price: 3807.5,
        },
      ],
    };
    const targetData = update(originSource, insertData);
    expect(targetData.data.length).toEqual(4);
    expect(targetData.data[1]).toEqual(insertData.data[0]);
  });

  it('orderbook update: action=update', () => {
    const updateData: WebsocketData<OrderbookResponse> = {
      table: 'orderBookL2_25',
      action: 'update',
      data: [
        {
          symbol: 'XBTUSD',
          id: 15599619150,
          side: 'Sell',
          size: 3000,
          price: 3808.5,
        },
      ],
    };
    const targetData = update(originSource, updateData);
    expect(targetData.data.length).toEqual(3);
    expect(targetData.data[0].size).toEqual(updateData.data[0].size);
  });
  it('orderbook update: action=delete', () => {
    const deleteData: WebsocketData<OrderbookResponse> = {
      table: 'orderBookL2_25',
      action: 'delete',
      data: [
        {
          symbol: 'XBTUSD',
          id: 15599619150,
          side: 'Sell',
          size: 1906,
          price: 3808.5,
        },
      ],
    };
    const targetData = update(originSource, deleteData);
    expect(targetData.data.length).toEqual(2);
    expect(targetData.data.find((o) => o.id === deleteData.data[0].id)).toBeUndefined();
  });

  it('transform', () => {
    const targetData = transform(originSource);
    expect(targetData.asks.length).toEqual(2);
    expect(targetData.bids.length).toEqual(1);
  });

  it('getChannel', () => {
    const pair = 'XBTUSD';
    const endPoint = PublicEndPoints.OrderBook10;
    const channel = getChannelName({ pair, endPoint });
    expect(channel).toEqual(`${endPoint}:${pair}`);
  });
});
