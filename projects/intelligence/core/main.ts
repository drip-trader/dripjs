/*// tslint:disable-next-line
require('dotenv').config();

import { realConfig } from '@dripjs/testing';

import { BitmexSpy } from './spy';
import { IntelFactory } from '.';

const bitmex = IntelFactory.create(BitmexSpy, realConfig);
bitmex.getDepth$('XBTUSD').subscribe((depth) => {
  console.log(depth);
});*/
