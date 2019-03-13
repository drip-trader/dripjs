import { Module } from '@nestjs/common';

import { IntelGateway } from './intel.gateway';
import { IntelService } from './intel.service';

@Module({
  providers: [IntelGateway, IntelService],
})
export class IntelModule {}
