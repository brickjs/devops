module.exports = {
  preset: 'ts-jest',
  bail: 10,
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html', 'cobertura'],
  reporters: ['default', 'jest-junit'],
};
