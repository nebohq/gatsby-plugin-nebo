import React from 'react';
import { Helmet } from 'react-helmet';
import NeboComponent, { NeboHead } from './nebo';

const NeboPage = ({ pageContext: { schema } }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <meta name="hi" content="bye"/>
        <NeboHead schema={schema} />
      </Helmet>

      <NeboComponent schema={schema} />
    </>
  )
};

export default NeboPage;
