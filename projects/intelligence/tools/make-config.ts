import { writeFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import { Config } from 'dripjs-types';

// tslint:disable-next-line
const jsonValueReplacer = require('json-value-replacer');

process.env['NODE_CONFIG_DIR'] = join(__dirname, '../../../', './config/');
// tslint:disable-next-line
const base: Config = require('config');
const writeFileAsync = promisify(writeFile);
const path = join(__dirname, '../config/default.json');

const script = `{
  "container": ${JSON.stringify(base.container)},
  "exchange": ${JSON.stringify(jsonValueReplacer(base.exchange, '***'))}
}`;
const formattedScript = JSON.stringify(JSON.parse(script), null, 2);

writeFileAsync(path, formattedScript).catch((error) => console.error('cannot generate config: ', error));
