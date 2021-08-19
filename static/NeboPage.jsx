import React from 'react';
import { Helmet } from 'react-helmet';
import NeboComponent, { NeboHead } from './nebo';

const NeboPage = ({ pageContext: { schema } }) => {
  return (
    <>
      <NeboHead schema={schema} wrapper={Helmet} />
      <NeboComponent schema={schema} />
    </>
  )
};

export default NeboPage;
