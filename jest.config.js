/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./test/jest.setup.js'],
  collectCoverageFrom: ['./src/**', './test/**'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
};
