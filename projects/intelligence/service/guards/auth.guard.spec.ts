import { ExecutionContext } from '@nestjs/common';

import { getSwitchToWs } from '../test-helpers';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let auth: AuthGuard;
  const context: ExecutionContext = <any>{};

  beforeAll(() => {
    auth = new AuthGuard();
    context.switchToWs = getSwitchToWs({});
  });

  it('canActivate return true', () => {
    expect(auth.canActivate(context)).toBeTruthy();
  });

  describe('Auth info not found', () => {
    const ctx: ExecutionContext = <any>{};

    it('username is undefined', () => {
      ctx.switchToWs = getSwitchToWs({ noUsername: true });
      expect(auth.canActivate(ctx)).toBeFalsy();
    });

    it('password is undefined', () => {
      ctx.switchToWs = getSwitchToWs({ noPassword: true });
      expect(auth.canActivate(ctx)).toBeFalsy();
    });
  });

  describe('Authentication failed', () => {
    const ctx: ExecutionContext = <any>{};

    it('username is wrong', () => {
      ctx.switchToWs = getSwitchToWs({ username: 'z' });
      expect(auth.canActivate(ctx)).toBeFalsy();
    });

    it('password is wrong', () => {
      ctx.switchToWs = getSwitchToWs({ password: 'z' });
      expect(auth.canActivate(ctx)).toBeFalsy();
    });
  });
});
