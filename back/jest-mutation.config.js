module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*spec\\.ts$', // All tests (unit + e2e)
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  testTimeout: 30000,
  globalSetup: '../../../jest-global-setup.js', // path is 3 directories up, because stryker working directory is back/.stryker-tmp/sandboxXYZ
};
