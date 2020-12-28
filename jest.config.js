module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '.+\\.css$': 'jest-transform-stub',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/util/*.js',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**',
  ],
  testURL: 'http://localhost',
}
