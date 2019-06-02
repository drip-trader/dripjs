import { IntelError } from '@dripjs/types';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { IntelServiceException } from './intel-exception';

@Catch(IntelServiceException)
export class IntelServiceExceptionFilter implements ExceptionFilter {
  catch(exception: IntelServiceException, host: ArgumentsHost): void {
    const client = host.switchToWs().getClient();
    const errorRespsonse: IntelError = {
      name: exception.name,
      message: exception.message,
    };
    client.emit('exception', errorRespsonse);
  }
}
