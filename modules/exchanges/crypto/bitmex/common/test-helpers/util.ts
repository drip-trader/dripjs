import { OrderSide } from '../../types';

// check value with order isde
export const isOrderSide = (side: any) =>
  side.toUpperCase() === OrderSide.Buy.toUpperCase() || side.toUpperCase() === OrderSide.Sell.toUpperCase();

// chedck uuid
export const isUuid = (v: any) => v.length === 36;
