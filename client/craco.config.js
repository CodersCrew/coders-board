const path = require('path');
const CracoAntDesignPlugin = require('craco-antd');
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
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
  babel: {
    plugins: ['@emotion/babel-plugin'],
  },
};
