import { Config, ExchangeCryptoAuthConfig, Symbol } from '@dripjs/types';
import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { BitmexSpy, IntelFactory, Spy } from '../../..';

// tslint:disable-next-line
const config: ExchangeCryptoAuthConfig = (<Config>require('config')).exchange['crypto']['bitmex'];

export interface IntelErrorResponse {
  name: string;
  message: string;
}

@WebSocketGateway()
export class IntelGateway {
  private readonly intelMap = new Map<string, Spy>();

  @SubscribeMessage('events')
  findAll(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(client: any, data: number): Promise<number> {
    return 123;
  }

  @SubscribeMessage('symbols')
  async symbols(client: SocketIOClient.Socket, exchange: string): Promise<Symbol[] | IntelErrorResponse> {
    const spy = this.getSpyImpl(exchange);
    if (!spy) {
      const error: IntelErrorResponse = {
        name: 'not_find_spy',
        message: `exchange: ${exchange}, can not find spy`,
      };

      return error;
    }

    return spy.getSymbols();
  }

  private getSpyImpl(spyName: string): Spy | undefined {
    let spyImpl = this.intelMap.get(spyName);
    if (!spyImpl) {
      switch (spyName) {
        case 'bitmex': {
          spyImpl = IntelFactory.create(BitmexSpy, { ...config, testnet: false });
          this.intelMap.set(spyName, spyImpl);
          break;
        }
        default: {
        }
      }
    }

    return spyImpl;
  }
}
