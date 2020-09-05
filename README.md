# @brickjs/devops

A collection of common scripts and configurations to build, test and deploy applications. 

Each application should use the following tech stacks:
1. Typescript
2. React
3. Jest

Installation
```
npm install @brickjs/devops --save-dev
```

Internally, this package will install other required dev dependencies such as `typescript` and `jest` 
thus each application `devDependencies` entry will be much shorter.

Sample usage in an application scripts:
```json
{
    "scripts": {
      "build": "brickjs-devops-scripts build",
      "build:watch": "brickjs-devops-scripts build --watch",
      "test": "brickjs-devops-scripts test"
    }
}
```
