const fetch = require('node-fetch');

exports.pluginOptionsSchema = ({ Joi }) => Joi.object({
  accessToken: Joi.string().required(),
  pageTemplatePath: Joi.string().default(`${process.cwd()}/NeboPage.jsx`),
  ignoredPageSlugs: Joi.array().default([]),
});

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Nebo implements Node {
      pages: [NeboComponent]
    }

    type NeboComponent {
      id: ID
      slug: String
      name: String
      type: String
      metadata: JSON
      schema: JSON
      params: JSON
      subschemas: JSON
    }
  `;
  createTypes(typeDefs);
};

exports.sourceNodes = async ({ actions, createContentDigest }, { accessToken }) => {
  const { createNode } = actions;

  let componentJSON;
  try {
    const response = await fetch('https://app.nebohq.com/api/pages', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    componentJSON = await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error('Could not fetch Nebo Components');
  }

  const pages = componentJSON.map((component) => ({
    ...component,
    internal: {
      type: 'NeboComponent',
    },
  }));

  createNode({
    id: 'nebo',
    pages,
    internal: {
      type: 'Nebo',
      contentDigest: createContentDigest({ pages }),
    },
  });
};

exports.createPages = async ({ actions, graphql }, {
  pageTemplatePath,
  ignoredPageSlugs,
}) => {
  const { data: { nebo: pages } } = await graphql(`
    query {
      nebo {
        pages {
          id
          name
          slug
          metadata
          type
          schema
          params
          subschemas
        }
      }
    }
  `);

  if (!pageTemplatePath) return;

  const ignoreSlugs = new Set(ignoredPageSlugs);

  pages.forEach((page) => {
    const { slug } = page;
    if (ignoreSlugs.has(slug)) return;

    actions.createPage({
      path: slug.replace(/(^\/)|(\/$)/g, '') || '/',
      context: { schema: page },
      component: require.resolve(pageTemplatePath),
    });
  });
};
