import React from 'react';
import { Helmet } from 'react-helmet';
import NeboComponent, { NeboHead } from './nebo';

const NeboPage = ({ schema }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <NeboHead schema={schema} />
      </Helmet>

      <NeboComponent schema={schema} />
    </>
  )
};

export default NeboPage;
