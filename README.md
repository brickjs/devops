# @brickjs/devops

A collection of opinionated common tools, scripts and configurations to build, test and deploy applications. 
With `@brickjs/devops`, each project does not need to install individual dependencies thus it greatly shortens the `devDependencies` entries.  

### Quick Start

Installation
```
npm install brickjs-devops --save-dev
```

Sample usage in an application scripts entry:
```json
{
    "scripts": {
      "build": "brickjs-devops-scripts build",
      "build:watch": "brickjs-devops-scripts tsc --watch",
      "test": "brickjs-devops-scripts test"
    }
}
```

### Available Script

| Script | Description |
|------|------------|
| build | Run tsc |
| test | Run jest |
| tsc | Typescript |
| jest | Jest |
| webpack | Webpack |
| webpack-dev-server | Webpack Dev Server |

### Common Config

tsconfig.json
```json
{
  "extends": "@brickjs/devops/config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./lib/",
    "rootDir": "./src/"
  },
  "include": [
    "./src/**/*"
  ]
}
```

jest.config.js
```javascript
const baseConfig = require('@brickjs/devops/config/jest.config.base');

module.exports = {
  ...baseConfig,
};
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
