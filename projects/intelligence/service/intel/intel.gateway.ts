import { Bar, Symbol } from '@dripjs/types';
import { UseFilters, UseGuards } from '@nestjs/common';
import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IntelServiceExceptionFilter } from '../exceptions';
import { AuthGuard } from '../guards';
import { IntelChannel, IntelRealtimeResponse } from '../types';
import { IntelService } from './intel.service';

type GetBarsInputData = [string, string, string, number, number];

type RealtimeInputData = [string, string, IntelChannel];

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

  @SubscribeMessage('bars')
  async bars(_: any, args: GetBarsInputData): Promise<Bar[]> {
    return this.interService.getBars(...args);
  }

  @SubscribeMessage('subscribe')
  subscribe(_: any, args: RealtimeInputData): Observable<WsResponse<IntelRealtimeResponse>> {
    return this.interService.data$(...args).pipe(map((res) => ({ event: args[2], data: res })));
  }

  @SubscribeMessage('unsubscribe')
  unsubscribe(_: any, args: RealtimeInputData): void {
    this.interService.stopData(...args);
  }
}
