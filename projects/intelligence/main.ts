// tslint:disable-next-line
require('dotenv').config();

import { realConfig } from '@dripjs/testing';

import { Bitmex } from './spy';
import { IntelligenceFactory } from '.';

const bitmex = IntelligenceFactory.create(Bitmex, realConfig);
bitmex.getDepth$('XBTUSD').subscribe((depth) => {
  console.log(depth);
});
