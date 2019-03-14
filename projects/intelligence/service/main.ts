#!/usr/bin/env node

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigIntelServer } from 'dripjs-types';

import { ApplicationModule } from './app.module';

// tslint:disable-next-line
const config = require('config');

async function bootstrap(): Promise<void> {
  if (!config || !config.container || !config.container.intelService) {
    Logger.error('config not found, please check');

    return;
  }

  const serverConfig: ConfigIntelServer = config.container.intelService;
  const app = await NestFactory.create(ApplicationModule);
  Logger.log(`start service, port: ${serverConfig.port}`, 'bootstrap');
  await app.listen(serverConfig.port);
}

bootstrap().catch((e) => {
  console.error('dripjs-intel-service on error: ', e.message);
  process.exit(1);
});
