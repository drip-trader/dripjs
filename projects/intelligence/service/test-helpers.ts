import { INestApplication } from '@nestjs/common';
import { ModuleMetadata, WsArgumentsHost } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { ConfigIntelServer } from 'dripjs-types';

// tslint:disable-next-line
const config: ConfigIntelServer = require('config').container.intelService;

export function getSwitchToWs(params: {
  noUsername?: boolean;
  noPassword?: boolean;
  username?: string;
  password?: string;
}): jest.Mock<WsArgumentsHost, []> {
  let un: string | undefined = config.username;
  let pwd: string | undefined = config.password;
  if (params.noUsername) {
    un = undefined;
  } else if (params.username) {
    un = params.username;
  }
  if (params.noPassword) {
    pwd = undefined;
  } else if (params.password) {
    pwd = params.password;
  }

  return jest.fn(() => {
    return <WsArgumentsHost>{
      getClient: () => {
        return {
          handshake: {
            headers: {
              username: un,
              password: pwd,
            },
          },
        };
      },
    };
  });
}

export async function createNestTestApplication(metadata: ModuleMetadata): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule(metadata).compile();

  return testingModule.createNestApplication();
}
