// check value with order isde
export const isOrderSide = (side: any) => side.toLowerCase() === 'buy' || side.toLowerCase() === 'sell';

// chedck uuid
export const isUuid = (v: any) => v.length === 36;
