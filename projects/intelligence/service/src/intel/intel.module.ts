import { Module } from '@nestjs/common';

import { IntelGateway } from './intel.gateway';

@Module({
  providers: [IntelGateway],
})
export class IntelModule {}
