// check value with order isde
export const isOrderSide = (side: any) => side.toUpperCase() === 'buy' || side.toUpperCase() === 'sell';

// chedck uuid
export const isUuid = (v: any) => v.length === 36;
