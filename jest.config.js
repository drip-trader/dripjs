module.exports = {
  rootDir: '.',
  setupTestFrameworkScriptFile: './jest.setup.js',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@drip/common': '<rootDir>/modules/common',
    '^@drip/(.*)': '<rootDir>/modules/$1',
  },
  modulePathIgnorePatterns: ['dist', '.history'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/modules/**/*.spec.ts', '<rootDir>/projects/**/*.spec.ts'],
  testURL: 'http://localhost/',
  collectCoverageFrom: ['modules/**/*.{js,ts}', 'projects/**/*.{js,ts}', '!**/node_modules/**', '!**/vendor/**'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test-helpers/'],
  coverageReporters: ['json', 'lcov'],
  verbose: true,
  preset: 'ts-jest',
};

