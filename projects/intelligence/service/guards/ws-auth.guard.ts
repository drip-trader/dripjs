import { ConfigIntelServer, IntelError } from '@dripjs/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    try {
      const username = client.handshake.query['username'];
      const password = client.handshake.query['password'];

      if (!username || !password) {
        throw new Error('Auth info not found.');
      }
      // tslint:disable-next-line
      const config: ConfigIntelServer = require('config').container.intelService;
      if (config.username !== username || config.password !== password) {
        throw new Error('Authentication failed.');
      }
    } catch (e) {
      const errorRespsonse: IntelError = {
        name: e.name,
        message: e.message,
      };
      client.emit('message', errorRespsonse);
      return false;
    }

    return true;
  }
}
