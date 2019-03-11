import { UseFilters, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { IntelGetSymbolsResponse } from '../common';
import { IntelServiceExceptionFilter } from '../exceptions';
import { AuthGuard } from '../guards';
import { IntelService } from './intel.service';

@WebSocketGateway()
@UseGuards(AuthGuard)
@UseFilters(IntelServiceExceptionFilter)
export class IntelGateway {
  constructor(private readonly interService: IntelService) {}

  @SubscribeMessage('events')
  findAll(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(client: any, data: number): Promise<number> {
    return 123;
  }

  @SubscribeMessage('symbols')
  async symbols(client: SocketIOClient.Socket, exchange: string): Promise<IntelGetSymbolsResponse> {
    return this.interService.getSymbols(exchange);
  }
}
