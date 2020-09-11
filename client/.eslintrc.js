const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:react-hooks/recommended',
    'plugin:lodash/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jest',
    'jest-dom',
    'prettier',
    'simple-import-sort',
    'lodash',
  ],
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': 0,
    complexity: 2, // prevents from writing too complex functions
    'sort-imports': 0, // turned of as we're using simple-import-sort for sorting
    'spaced-comment': [2, 'always', { markers: ['/'] }], // modified to allow TS references with triple brackets
    'lodash/import-scope': [2, 'member'], // always expect import { x } from 'lodash' syntax
    'lodash/prefer-lodash-method': 0, // we always prefer native function implementation if it exists
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }], // reduces allowed extensions to typescript ones
    'react/destructuring-assignment': 0, // in many cases we want to destructure part of the props
    'react-hooks/exhaustive-deps': 0, // in many cases we want to relate useEffect invocation only to a few of variables used inside
    '@typescript-eslint/explicit-module-boundary-types': 0, // in many cases TS knows return type of the function so we don't need to specify it explicitly
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }], // we want the possibility to declare unused vars with _ prefix
    '@typescript-eslint/array-type': 2, // each array type should be written as type[]
    '@typescript-eslint/consistent-type-imports': [2, { prefer: 'no-type-imports' }], // we want to import types along with the normal imports
    '@typescript-eslint/prefer-enum-initializers': 2, // enum values should be always specified explicitly
    'simple-import-sort/sort': 2, // treat unsorted imports as lint errors
    'import/order': 0, // turned of as we're using simple-import-sort for sorting
    'import/prefer-default-export': 0, // we're using default exports only for pages
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: ['**/*.test.tsx', '**/*.stories.tsx', 'craco.config.js', '**/test/*'] }, // files where dev dependencies imports are allowed
    ],
    // custom import sorting
    'simple-import-sort/sort': [
      2,
      {
        groups: [
          ['^\\u0000'], // Side effect imports.
          ['^react', '^@?\\w'], // Packages from node_modules. `react` related packages come first.
          ['^[^.]'], // Absolute imports (mostly written as `@/foo`). Anything that does not start with a dot.
          ['^\\.'], // Relative imports. Anything that starts with a dot.
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx'], // files with react components
      rules: {
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
        extensions: ['.js', '.ts', '.tsx'],
      },
      typescript: {
        project: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
};
