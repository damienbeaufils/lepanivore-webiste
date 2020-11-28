/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  mutate: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/*.module.ts'],
  jest: {
    configFile: './jest-mutation.config.js',
  },
};
