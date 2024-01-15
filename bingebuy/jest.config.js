module.exports = {
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/'],
  };
  