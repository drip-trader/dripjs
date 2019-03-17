import { UseFilters, UseGuards } from '@nestjs/common';
import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Symbol } from 'dripjs-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IntelServiceExceptionFilter } from '../exceptions';
import { AuthGuard } from '../guards';
import { IntelChannel, IntelRealtimeResponse } from '../types';
import { IntelService } from './intel.service';

@WebSocketGateway()
@UseGuards(AuthGuard)
@UseFilters(IntelServiceExceptionFilter)
export class IntelGateway implements OnGatewayDisconnect {
  constructor(private readonly interService: IntelService) {}

  handleDisconnect(_: any): void {
    this.interService.close();
  }

  @SubscribeMessage('symbols')
  async symbols(_: any, exchange: string): Promise<Symbol[]> {
    return this.interService.getSymbols(exchange);
  }

  @SubscribeMessage('subscribe')
  subscribe(_: any, args: string[]): Observable<WsResponse<IntelRealtimeResponse>> {
    return this.interService.data$(args[0], args[1], <IntelChannel>args[2]).pipe(map((res) => ({ event: args[2], data: res })));
  }

  @SubscribeMessage('unsubscribe')
  unsubscribe(_: any, args: string[]): void {
    this.interService.stopData(args[0], args[1], <IntelChannel>args[2]);
  }
}
