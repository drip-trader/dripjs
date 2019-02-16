import { ExecInst, OrderSide, OrderStatus, OrderType, TimeInForce } from './order';

export interface OrderRequest {
  symbol: string;
  side: OrderSide;
  orderQty: number;
  price: number;
  displayQty?: number;
  stopPx?: number;
  clOrdID?: number;
  clOrdLinkID?: string;
  pegOffsetValue?: number;
  pegPriceType?: string;
  ordType: OrderType;
  timeInForce?: TimeInForce;
  execInst: ExecInst;
  ordStatus: OrderStatus;
  text: string;
}
