import { ArgumentsHost } from '@nestjs/common';
import { WsArgumentsHost } from '@nestjs/common/interfaces';

import { IntelServiceException } from './intel-exception';
import { IntelServiceExceptionFilter } from './intel-exception-filter';

describe('IntelServiceExceptionFilter', () => {
  let intelServiceExceptionFilter: IntelServiceExceptionFilter;
  const host = <ArgumentsHost>{};

  beforeAll(() => {
    intelServiceExceptionFilter = new IntelServiceExceptionFilter();
    host.switchToWs = jest.fn(() => {
      return <WsArgumentsHost>{
        getClient: () => {
          return { emit: (event: string, res: any) => {} };
        },
      };
    });
  });

  it('catch', () => {
    expect(intelServiceExceptionFilter.catch(new IntelServiceException('test'), host)).toBeUndefined();
  });
});
