import React from 'react';
import { Helmet } from 'react-helmet';

export default ({ title, description, siteName, children }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:description" content={description} />
    <link rel="icon" href="/favicon.ico" />
    {children}
  </Helmet>
);
