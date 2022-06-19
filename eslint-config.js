module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // to support prettier. Let prettier formats the arrow function.
    'arrow-body-style': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // https://stackoverflow.com/questions/64463299/no-shadow-false-positive-when-declaring-any-typescript-enum-in-jhipster-app
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    // https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // to support typescript for airbnb config. Typescript will validate the props.
    'react/prop-types': 'off',
    'react/require-default-props': 'off',

    // to support typescript for airbnb config
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // to support typescript for airbnb config
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],

    // to support typescript for airbnb config
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    'no-undef': 'off',

    // allow props spreading for easy code maintenance.
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',

    // Use named import
    'import/prefer-default-export': 'off',

    // Git will auto convert linebreak
    'linebreak-style': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    jest: true,
  },
};
