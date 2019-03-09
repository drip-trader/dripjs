import { Module } from '@nestjs/common';

import { IntelModule } from './intel';

@Module({
  imports: [IntelModule],
})
export class ApplicationModule {}
