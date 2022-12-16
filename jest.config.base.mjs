module.exports = {
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      isolatedModules: true,
    },
  },
  bail: 0,
  modulePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/dist/'],
  reporters: ['default', 'jest-junit'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '\\.css$': 'identity-obj-proxy',
  },
  transform: {},
};
