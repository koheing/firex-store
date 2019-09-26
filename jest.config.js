module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  transformIgnorePatterns: ['node_modules'],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
}
