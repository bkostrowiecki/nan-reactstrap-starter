module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  rootDir: '../../',
  testMatch: ['<rootDir>/src/client/**/*.test.{ts,tsx}'],
  collectCoverageFrom: ['**/*.(t|j)s', '**/*.(t|j)sx'],
  coverageDirectory: '<rootDir>/coverage/client',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
