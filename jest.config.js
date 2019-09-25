module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  transformIgnorePatterns: ['node_modules/(?!(jest-test))'],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
}
