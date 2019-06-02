import { ExecutionContext } from '@nestjs/common';

import { getSwitchToWs } from '../test-helpers';
import { WsAuthGuard } from './ws-auth.guard';

describe('AuthGuard', () => {
  let auth: WsAuthGuard;
  const context: ExecutionContext = <any>{};

  beforeAll(() => {
    auth = new WsAuthGuard();
    context.switchToWs = getSwitchToWs({ query: true });
  });

  it('canActivate return true', () => {
    expect(auth.canActivate(context)).toBeTruthy();
  });

  describe('Auth info not found', () => {
    const ctx: ExecutionContext = <any>{};

    it('username is undefined', () => {
      ctx.switchToWs = getSwitchToWs({ noUsername: true, query: true });
      expect(auth.canActivate(ctx)).toBeFalsy();
    });

    it('password is undefined', () => {
      ctx.switchToWs = getSwitchToWs({ noPassword: true, query: true });
      expect(auth.canActivate(ctx)).toBeFalsy();
    });
  });

  describe('Authentication failed', () => {
    const ctx: ExecutionContext = <any>{};

    it('username is wrong', () => {
      ctx.switchToWs = getSwitchToWs({ username: 'z', query: true });
      expect(auth.canActivate(ctx)).toBeFalsy();
    });

    it('password is wrong', () => {
      ctx.switchToWs = getSwitchToWs({ password: 'z', query: true });
      expect(auth.canActivate(ctx)).toBeFalsy();
    });
  });
});
