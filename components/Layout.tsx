import React, { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import Header from './Header';
import Footer from './Footer';

type Props = {
    children?: ReactNode;
    title?: string;
};

const Global = createGlobalStyle`
  html,
  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

  #__next {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

const Layout = ({ children, title }: Props): ReactElement => (
    <div style={{ position: 'relative', height: '100%' }}>
        <Global />
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        {children}
        <Footer />
    </div>
);

export default Layout;
