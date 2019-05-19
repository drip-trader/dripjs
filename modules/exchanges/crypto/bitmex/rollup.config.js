/* globals process */

import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

const environment = process.env.ENV || 'development';
const isDevelopmentEnv = environment === 'development';

module.exports = [
  {
    input: 'dist/index.js',
    output: {
      name: 'Bitmex',
      format: 'umd',
      sourcemap: false,
      file: `deploy/${require('./package.json').name}-v${require('./package.json').version}.js`,
      exports: 'named',
    },
    plugins: [
      commonjs(),
      globals(),
      builtins(),
      resolve({
        browser: true,
      }),
      json(),
      !isDevelopmentEnv && terser(),
    ],
  },
];
