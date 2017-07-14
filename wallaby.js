process.env.BABEL_ENV = 'test';

module.exports = function (wallaby) {
  const path = require('path');
  const ts = require(path.join(wallaby.localProjectDir, 'node_modules/typescript'));
  return {
    files: [
      "src/**/*.ts?(x)",
      "!src/**/*.spec.ts?(x)",
      "package.json"
    ],
    tests: [
      "src/**/*.spec.ts?(x)"
    ],
    env: {
      type: "node",
      runner: "node"
    },
    filesWithNoCoverageCalculated: ['src/**/*.builder.ts', 'src/statemanagement/actions.ts',
      'src/**/*.module.ts', 'src/**/index.ts', 'src/*.ts', 'node_modules/**/*.*'
    ],
    compilers: {
      'src/**/*.ts?(x)': wallaby.compilers.typeScript(Object.assign(require('./tsconfig.jest.json'), {typescript: ts}))
    },
    preprocessors: {
      '**/*.js?(x)': file => require('babel-core').transform(
        file.content, {
          sourceMap: true,
          "presets": ["react", "es2015", "stage-0"],
          "plugins": ["react-hot-loader/babel", "transform-object-rest-spread"]
        })
    },
    testFramework: "jest",
    debug: true,
    bootstrap: function (wallaby) {
      wallaby.testFramework.configure({
        "globals": {
          "__TS_CONFIG__": "tsconfig.jest.json"
        },
        "setupTestFrameworkScriptFile": "./build-config/test-bundle.js",
        "moduleNameMapper": {
          "^.+\\.(s?css|less)$": "<rootDir>/config/empty-module.js"
        }
      });
    }
  };
};