# gastby-plugin-nebo

A Gatsby plugin that sources data from Nebo, the visual React builder.

This plugin builds the pages you created in Nebo.

## Table of Contents
- [Install](#install)
- [How to use](#how-to-use)
  - [Adding pages](#adding-pages)
  - [Adding your styles](#adding-your-styles)
  - [Adding your components](#adding-your-components)
  - [Configuration Options](#configuration-options)
  - [Questions and feedback](#questions-and-feedback)

## Install
1. Sign up for [Nebo](https://app.nebohq.com/users/sign_up). After you've signed in, navigate to "Settings" on the side bar.

2. Find and copy the access token. You can find it in the "Developers" section:
   
<img alt="Access Token" height="150px" src="https://res.cloudinary.com/hzimreaxl/image/upload/v1622158327/setup-developers.png"/>

3. Set up the plugin in your `gatsby-config.js`, adding in your access token:

```js
module.exports = {
  plugins: [
    ...otherPlugins,
    {
      resolve: 'gatsby-plugin-nebo',
      // make sure to provide your access token below!
      options: { accessToken: '[YOUR ACCESS KEY HERE]' },
    },
  ],
};
```

4. Install `gatsby-plugin-nebo` and `@nebohq/nebo`:
```shell
# if you are using npm and package-lock.json
npm install gatsby-plugin-nebo @nebohq/nebo
# if you are using yarn and yarn.lock
yarn add gatsby-plugin-nebo @nebohq/nebo
```

5. You're now ready to build pages in Nebo!

Installing the plugin generates the configuration (`./src/config/nebo-config.js`) and the page template (`./src/templates/nebo-page.js`). 
If you have filled in your access token in `gatsby-config.js`, it will automatically be added to the configuration.

## How to use
### Adding pages
1. Navigate to your [Nebo home page](https://app.nebohq.com).
2. Click "New Page".
   
<img alt="New Page" height="100px" src="https://res.cloudinary.com/hzimreaxl/image/upload/v1622250220/setup-new_page.png"/>

3. Once you're in the editor, click on the gear icon in the top right to go to page settings. 
   
<img alt="Settings" height="200px" src="https://res.cloudinary.com/hzimreaxl/image/upload/v1622250448/setup-settings.png"/>

4. Here, you can change the name and slug of your page. The slug will be part of the url of the page in the format: `[YOUR_DOMAIN]/[SLUG]`. 
   For example, for the slug `hello_world` will create a page at `https://nebohq.com/hello_world`.
5. Now, click on the top component on the right. If you named your page `Hello, world!`, it will be called `Hello, world!`.

<img alt="Settings" height="150px" src="https://res.cloudinary.com/hzimreaxl/image/upload/v1622251123/setup-editor.png"/>

6. Here you, can edit the page in any way you want. For the sake of this example, we added "This is a test page!" as the content of this page.
   You can find more information on [how to use the editor here](https://nebohq.com/docs/editor).
7. Save your work by clicking the cloud button on the top right.
8. Once you reload your development server (`npm run develop`) or redeploy, the page will now be available in your Gatsby app.

### Adding your styles
1. On the Nebo website, navigate to "Developer" settings in the Nebo App.
   Add `[YOUR_PRODUCTION_URL]/nebo-config.css`<sup>1</sup> or `[YOUR_DEVELOPMENT_URL]/nebo-config.css`<sup>2</sup> to CSS Source URL.
2. If you are using the production URL, make sure you have deployed your app at least once with `gatsby-plugin-nebo` installed for the URL to become available.
3. In your code, navigate to `./src/config/nebo-config.js` (or your `configPath`). Add your styles in the indicated space:

```js
import { configure } from '@nebohq/nebo';
import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { Linkedin } from 'react-bootstrap-icons';

// ADD YOUR STYLES HERE
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/directory.module.scss';

const directory = configure({}); // OPTIONS

export default directory;
```

4. Deploy your Gatsby app. If you are using you local development url, switch it your production one first!
5. Once your deploy is complete, your styles will be available in the Nebo editor.

<sup>1</sup> If you have changed the `configPath`, the URL will be: `[YOUR_PRODUCTION_URL]/[CONFIG_PATH_FILE_NAME].css`.

<sup>2</sup> Usually, the development URL will be `http://localhost:8000/nebo-config.css`.
If your `configPath` has been changed, it will be `http://localhost:8000/[CONFIG_PATH_FILE_NAME].css`.

### Adding your components
1. On the Nebo website, navigate to "Developer" settings in the Nebo App. Add `[YOUR_PRODUCTION_URL]/nebo-config.js`<sup>1</sup> or `[YOUR_DEVELOPMENT_URL]/nebo.js`<sup>2</sup> to "Javascript Source URL".
2. If you are using the production URL, make sure you have deployed your app at least once with `gatsby-plugin-nebo` installed for the URL to become available.
3. In your code, navigate to `./src/config/nebo-config.js` (or your `configPath`). Add your components in the indicated space.

```js
import { configure } from '@nebohq/nebo';
import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { Linkedin } from 'react-bootstrap-icons';

const directory = configure({
  directory: {
    // ADD YOUR COMPONENTS HERE
    Nav,
    Icons: { LinkedIn },
    Bootstrap: { Layout: { Container, Row, Col } }
  },
  react: React,
  renderer: ReactDOM,
  accessToken: '[YOUR_ACCESS_TOKEN]'
});

export default directory;
```

4. Deploy your Gatsby app. If you are using you local development url, switch it your production one first!
5. Once your deploy is complete, your components will be available in the Nebo editor.

<sup>1</sup> If you have changed the `configPath`, the URL will be: `[YOUR_PRODUCTION_URL]/[CONFIG_PATH_FILE_NAME].js`.

<sup>2</sup> Usually, the development URL will be `http://localhost:8000/nebo-config.js`.
If your `configPath` has been changed, it will be `http://localhost:8000/[CONFIG_PATH_FILE_NAME].js`.

### Configuration Options
```js
module.exports = {
  plugins: [
    ...otherPlugins,
    {
      resolve: 'gatsby-plugin-nebo',
      options: { 
        accessToken: '[ACCESS_KEY]',
        configPath: `${__dirname}/src/config/nebo-config.js`, // path to the configruation file
        pageTemplatePath: `${__dirname}/src/templates/nebo-page.js`, // path to the page template
        ignoredPageSlugs: [] // list of page slugs you want to ignore
      },
    },
  ],
};
```

- `accessToken` - [required] - used to access your components from your Gatsby app.
- `configPath` - path to the the Nebo configuration file. This controls which of your components are available in the Nebo editor.
- `pageTemplatePath` - path to the Nebo page template. This controls the look of your pages.
- `ignoredPageSlugs` - list of pages to ignore, by their Nebo slug.

## Questions and feedback
If you have questions about Nebo or want to provide us feedback, [join our discord](https://discord.gg/eYZZkJV992)!
