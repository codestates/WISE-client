/* eslint-disable react/jsx-props-no-spreading */
// import App from 'next/app';
import 'antd/dist/antd.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Global } from '../components/style/global';
import wrapper from '../store/configureStore';
import theme from '../components/style/theme';

const WISE = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>WISE</title>
        </Head>
        <ThemeProvider theme={theme}>
            <Global />
            <Component {...pageProps} />
        </ThemeProvider>
    </>
);

export default wrapper.withRedux(WISE);
