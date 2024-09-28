export default {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom', 
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};