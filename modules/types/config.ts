import { ConnectionOptions } from 'typeorm';

export interface Config {
  // config file name. for debug purpose.
  env: string;
  production: boolean;
  database: Partial<ConnectionOptions>;
  container: ConfigContainer;
  exchange: ConfigExchange;
  log: {
    typeorm: boolean;
  };
}

export interface ConfigContainer {
  intelService: ConfigIntelServer;
}

export interface ConfigIntelServer {
  port: number;
  username: string;
  password: string;
}

export interface ConfigExchange {
  [type: string]: ConfigExchangeCrypto;
}

export interface ConfigExchangeCrypto {
  [exchange: string]: ExchangeCryptoAuthConfig;
}

export interface ExchangeCryptoAuthConfig {
  apiKey: string;
  apiSecret: string;
}
