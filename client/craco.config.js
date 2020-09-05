const path = require('path');
const CracoAntDesignPlugin = require('craco-antd');
const CracoAlias = require('craco-alias');

if (process.env.IS_PRODUCTION) {
  process.env.REACT_APP_IS_PRODUCTION = true;
}

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#2f54eb',
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: path.resolve(__dirname, 'tsconfig.paths.json'),
      },
    },
  ],
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false,
  },
  babel: {
    plugins: ['@emotion/babel-plugin'],
  },
};
