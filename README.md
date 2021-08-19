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

2. Install `gatsby-plugin-nebo`:
```shell
# if you are using npm and package-lock.json
npm install gatsby-plugin-nebo
# if you are using yarn and yarn.lock
yarn add gatsby-plugin-nebo
```

3. Find and copy the access token. You can find it in the "Developers" section:

<img alt="Access Token" height="150px" src="https://res.cloudinary.com/hzimreaxl/image/upload/v1622158327/setup-developers.png"/>

4. Run the following command:
```shell
# with npm
npx nebo init --access-token=your-access-token

# with yarn
yarn run nebo init --access-token=your-access-token
```

5. Add your plugin configuration to `gatsby-config.js`. It should look something like this:
```json
{
  "resolve": "gatsby-plugin-nebo",
  "options": {
    "accessToken": "[YOUR ACCESS TOKEN]",
    "pagePath": "./NeboPage.jsx"
  }
}
```

6. This will generate three files: `nebo.config.js`, `nebo.js`, and `NeboPage.jsx`. We'll use the first to import components, the second output Nebo assets for use in settings, and the third is the layout of pages coming from Nebo.

7. You're now ready to build pages in Nebo!

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
1. Go to `nebo.config.js`.

2. Change the `globalStylesPath` option to point to your global styles.

```scss
module.exports = {
  // other options
  globalStylesPath: ["./src/stylesheets/application.scss", "./src/stylesheets/globals.css"],
};
```

3. Run the following command to compile your Nebo assets. This will build two files `nebo.css` and `nebo.js`. It will also keep track as you change files.
```shell
# with npm
npx nebo watch

# with yarn
yarn run nebo watch
```

4. On the Nebo website, navigate to "Developer" settings in the Nebo App. Add `[YOUR_DEVELOPMENT_URL]/nebo.css` (usually something like `localhost:3000/nebo.css`) to "CSS Source URL".

5. Your styles have now been imported! You should see them after refreshing the Nebo editor.

6. Before you commit your changes, please run the following commands. These will compile the Nebo assets for production.
```shell
# with npm
npx nebo

# with yarn
yarn run nebo
```

7. After you've deployed your changes, navigate to "Developer" settings in the Nebo App. Switch the "CSS Source URL" to the path of your production Nebo asset (usually `[YOUR_PRODUCTION_URL]/nebo.css`).


### Adding your component library
1. Run the following command to compile your Nebo assets. This will build two files `nebo.css` and `nebo.js`. It will also keep track as you change files.
```shell
# with npm
npx nebo watch

# with yarn
yarn run nebo watch
```

2. Navigate to `nebo.js`. Add one of your components to the Nebo directory in the indicated place.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Component, { configure, fetchComponent } from '@nebohq/nebo';

const accessToken = '[ACCESS_TOKEN]';
const directory = configure({
  directory: {
    // Add your components here
  },
  react: React,
  renderer: ReactDOM,
  accessToken,
});

const fetchSchema = async (idOrSlug) => fetchComponent({ idOrSlug, accessToken });

const NeboComponent = Component;
export default NeboComponent;
export { directory, fetchSchema };
``` 

3. On the Nebo website, navigate to "Developer" settings in the Nebo App. Add `[YOUR_DEVELOPMENT_URL]/nebo.js` (usually something like `localhost:3000/nebo.js`) to "Javascript Source URL".

4. Your component component has now been imported! You should see it in the library dropdown under "Imported Components".

5. Before you commit your changes, please run the following commands. These will compile the Nebo assets for production.
```shell
# with npm
npx nebo

# with yarn
yarn run nebo
```

6. After you've deployed your changes, navigate to "Developer" settings in the Nebo App. Switch the "JavaScript Source URL" to the path of your production Nebo asset (usually `[YOUR_PRODUCTION_URL]/nebo.js`).

### Configuration Options
```js
module.exports = {
  plugins: [
    ...otherPlugins,
    {
      resolve: 'gatsby-plugin-nebo',
      options: { 
        accessToken: '[ACCESS_KEY]',
        pageTemplatePath: `${__dirname}/NeboPage.jsx`, // path to the page template
        ignoredPageSlugs: [] // list of page slugs you want to ignore
      },
    },
  ],
};
```

- `accessToken` - [required] - used to access your components from your Gatsby app.
- `pageTemplatePath` - path to the Nebo page template. This controls the look of your pages.
- `ignoredPageSlugs` - list of pages to ignore, by their Nebo slug.

## Questions and feedback
If you have questions about Nebo or want to provide us feedback, [join our discord](https://discord.gg/eYZZkJV992)!
