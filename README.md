# @brickjs/devops

A collection of opinionated common tools, scripts and configurations to build, test and deploy applications. 
With `@brickjs/devops`, each project does not need to install individual dependencies thus it greatly shortens the `devDependencies` entries.  

### mts and mjs

Starting from version 2, this package will only support .mts and .mjs extensions.

### Quick Start

Installation
```
npm install brickjs-devops --save-dev
```

For monorepo setup, the package will re-export the following scripts:

| Script             | Description                                |
|--------------------|--------------------------------------------|
| concurrently       | https://www.npmjs.com/package/concurrently |
| cross-env          | https://www.npmjs.com/package/cross-env    |
| env-cmd            | https://www.npmjs.com/package/env-cmd      |
| jest               | https://www.npmjs.com/package/jest         |
| tsc                | https://www.npmjs.com/package/typescript   |
| webpack            | https://www.npmjs.com/package/webpack      |

This will allow the packages to access the script directly.

### Common Config

tsconfig.json
```json
{
  "extends": "brickjs-devops/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./lib/",
    "rootDir": "./src/"
  },
  "include": [
    "./src/**/*"
  ]
}
```

jest.config.mjs
```javascript
import baseConfig from 'brickjs-devops/jest.config.base.mjs';

const config = {
  ...baseConfig,
};
export default config;
```

webpack.config.js
```javascript
const webpack = require('webpack');
const { createAppConfig } = require('@brickjs/devops/config/webpack.create.config');
const packageVersion = require('./package.json').version;
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  createAppConfig({
    rootDir: __dirname,
    packageVersion,
    plugins: [
      new HTMLWebpackPlugin({
        template: 'template/template.html',
      }),
    ],
    entry: {
      'app': ['./src/index.tsx'],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  }),
];

```

## tsconfig.base.json

Target is `esnext` to allow the latest feature of typescript.

All codes will be transpiled to ES5 or ES6 by webpack, thus
developer should not be restricted to particular version of ES.

`allowJs` is false to ensure that projects are using typescript only.

`skipLibCheck` is true to save time in ts checking.
