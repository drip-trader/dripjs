import { ConfigIntelServer } from '@dripjs/types';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './src/app.module';

// tslint:disable-next-line
const config: ConfigIntelServer = require('config').container.intelService;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(config.port);
}

bootstrap().catch((e) => {
  console.error('dripjs-intel-service on error: ', e.message);
  process.exit(1);
});
