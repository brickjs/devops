const mjsResolver = (path, options) => {
  const mjsExtRegex = /\.mjs$/i;
  const resolver = options.defaultResolver;
  if (mjsExtRegex.test(path)) {
    try {
      return resolver(path.replace(mjsExtRegex, '.mts'), options);
    } catch {
      // use default resolver
    }
  }

  return resolver(path, options);
};

const jestConfig = {
  resolver: mjsResolver,
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    // '^.+\\.tsx?$'
    '^.+\\.m?[t]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.m[jt]sx?$',
};

export default jestConfig;
