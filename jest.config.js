export default {
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  collectCoverageFrom: [
    'src/server/**/*.js',
    '!src/server/app.js',
    '!**/node_modules/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};