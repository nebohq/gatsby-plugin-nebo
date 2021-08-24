#!/usr/bin/env node

const {
  CLI, Settings, commands: { Compiler, Watcher, Initializer },
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('@nebohq/plugin');
const fs = require('fs');
const path = require('path');

const defaultSettings = Settings.update({ publicPath: './static', pagePath: './NeboPage.jsx' });

CLI([
  Initializer.configure({
    options: { defaultSettings },
    callback: async (options, processor) => {
      const { accessToken } = options;
      if (!accessToken) throw new Error('Please provide an access token.');

      const result = await processor(options);

      if (!fs.existsSync(defaultSettings.publicPath)) {
        fs.mkdirSync(defaultSettings.publicPath, { recursive: true });
      }

      if (!fs.existsSync(defaultSettings.pagePath)) {
        const template = fs.readFileSync(path.join(__dirname, '../static/NeboPage.jsx'));
        fs.writeFileSync(defaultSettings.pagePath, template);
      }

      // eslint-disable-next-line no-console
      console.log('\nPlease add the following to ./gatsby-config.js as a plugin:');
      // eslint-disable-next-line no-console
      console.log(JSON.stringify({
        resolve: 'gatsby-plugin-nebo',
        options: { accessToken, pageTemplatePath: defaultSettings.pagePath },
      }, null, '  '));

      return result;
    },
  }),
  Compiler.configure({ options: { defaultSettings } }),
  Watcher.configure({ options: { defaultSettings } }),
]);
