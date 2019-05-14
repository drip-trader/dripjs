import { Config } from '../types';
import { WebsocketBase } from './websocket-base';

export class Websocket extends WebsocketBase {
  constructor(config?: Config) {
    super(config);
  }
}
