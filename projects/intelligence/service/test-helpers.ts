import { ConfigIntelServer } from '@dripjs/types';
import { WsArgumentsHost } from '@nestjs/common/interfaces';

// tslint:disable-next-line
const config: ConfigIntelServer = require('config').container.intelService;

export function getSwitchToWs(params: {
  noUsername?: boolean;
  noPassword?: boolean;
  username?: string;
  password?: string;
  query?: boolean;
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
        if (params.query) {
          return {
            handshake: {
              query: {
                username: un,
                password: pwd,
              },
            },
          };
        } else {
          return {
            handshake: {
              headers: {
                username: un,
                password: pwd,
              },
            },
          };
        }
      },
    };
  });
}
