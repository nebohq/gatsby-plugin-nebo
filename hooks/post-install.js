const fs = require('fs');
const { join, dirname, relative } = require('path');

const workingDirectory = process.env.INIT_CWD || process.cwd();
const configFile = `${workingDirectory}/gatsby-config.js`;

let plugins;
try {
  // eslint-disable-next-line no-new-func
  const exports = new Function(
    'module',
    'require',
    '__dirname',
    'process',
    `"use strict";
  ${fs.existsSync(configFile) ? fs.readFileSync(configFile).toString() : ''} 
  return module.exports;`,
  )({ exports: {} }, require, workingDirectory, process);
  plugins = exports.plugins;
} catch {
  plugins = [];
}

let { options = {} } = plugins.find((plugin) => {
  if (typeof plugin === 'string') return false;
  return plugin.resolve === 'gatsby-plugin-nebo';
}) || { options: {} };
options = {
  accessToken: '[ACCESS_TOKEN]',
  pageTemplatePath: join(workingDirectory, 'src/templates/nebo-page.js'),
  configPath: join(workingDirectory, 'src/config/nebo-config.js'),
  ...options,
};

const scaffold = {
  config: {
    path: options.configPath,
    template: './static/nebo-config.js',
    replacer: (string) => string.replace(/\[ACCESS_TOKEN]/, options.accessToken),
  },
  template: {
    path: options.pageTemplatePath,
    template: './static/nebo-page.js',
    replacer: (string) => {
      const relativePath = relative(dirname(options.pageTemplatePath), options.configPath);
      const path = relativePath.replace(/\.js(x)?$/, '');
      return string.replace(/\[CONFIG_FILE]/, path);
    },
  },
};

Object.values(scaffold).forEach(({ path, template, replacer }) => {
  const directory = dirname(path);
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
  if (fs.existsSync(path)) return;

  const contents = fs.readFileSync(template).toString();
  fs.writeFileSync(path, replacer(contents));
});
