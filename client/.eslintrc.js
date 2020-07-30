const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest', 'prettier', 'simple-import-sort'],
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
    'sort-imports': 0,
    'spaced-comment': [2, 'always', { markers: ['/'] }],
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-indent': 0,
    'react/destructuring-assignment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    'simple-import-sort/sort': 2,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.tsx', '**/*.stories.tsx', 'craco.config.js', '**/test/*'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'simple-import-sort/sort': [
      2,
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything that does not start with a dot.
          ['^[^.]'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
      },
    },
    {
      files: ['**/store/*.ts'],
      rules: {
        'no-param-reassign': 0,
      },
    },
    {
      files: ['**/*.translations.ts'],
      rules: {
        '@typescript-eslint/camelcase': 0,
      },
    },
    {
      files: ['**/models/*.ts'],
      rules: {
        'import/no-cycle': 0,
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      files: ['*.apollo.tsx', 'graphql.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        'import/no-duplicates': 0,
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
        directory: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
};
