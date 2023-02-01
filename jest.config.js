const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'node'],

  // Automatically reset mock state before every test
  resetMocks: true,

  // The root directory that Jest should scan for tests and modules within
  rootDir: resolveApp('.'),

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [],

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|mjs|cjs|ts)$': path.resolve(
      __dirname,
      './config/babelTransform.js'
    ),
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
};
