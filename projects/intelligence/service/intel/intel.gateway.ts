import { Bar, GetBarsInput, IntelRealtimeResponse, RealtimeInput, Symbol } from '@dripjs/types';
import { OnModuleDestroy, UseFilters, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IntelServiceExceptionFilter } from '../exceptions';
import { WsAuthGuard } from '../guards';
import { IntelService } from './intel.service';

@WebSocketGateway()
@UseGuards(WsAuthGuard)
@UseFilters(IntelServiceExceptionFilter)
export class IntelGateway implements OnModuleDestroy {
  constructor(private readonly interService: IntelService) {}

  onModuleDestroy(): void {
    this.interService.close();
  }

  @SubscribeMessage('symbols')
  async symbols(_: any, exchange: string): Promise<Symbol[]> {
    return this.interService.getSymbols(exchange);
  }

  @SubscribeMessage('bars')
  async bars(_: any, input: GetBarsInput): Promise<Bar[]> {
    return this.interService.getBars(input);
  }

  @SubscribeMessage('subscribe')
  subscribe(_: any, input: RealtimeInput): Observable<WsResponse<IntelRealtimeResponse>> {
    return this.interService.data$(input).pipe(map((res) => ({ event: input.channel, data: res })));
  }

  @SubscribeMessage('unsubscribe')
  unsubscribe(_: any, input: RealtimeInput): void {
    this.interService.stopData(input.exchange, input.symbol, input.channel);
  }
}
