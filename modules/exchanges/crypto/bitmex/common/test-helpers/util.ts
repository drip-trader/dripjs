import { OrderSide } from '../../types';

// check value with order isde
export const isOrderSide = (side: any) => side === OrderSide.Buy || side === OrderSide.Sell;

// chedck uuid
export const isUuid = (v: any) => v.length === 36;
