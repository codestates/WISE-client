/* eslint-disable react/jsx-props-no-spreading */
import 'antd/dist/antd.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Global } from '../components/style/global';
import wrapper from '../store/configureStore';
import theme from '../components/style/theme';
import Loading from '../components/Loading';

const WISE = ({ Component, pageProps }: AppProps) => {
    const [loading, setLoading] = useState(false);

    // next/router event 감지를 이용한 페이지 이동 시 loading component display
    useEffect(() => {
        const start = () => setLoading(true);
        const end = () => setLoading(false);

        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', end);
        Router.events.on('routeChangeError', end);

        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', end);
            Router.events.off('routeChangeError', end);
        };
    }, []);

    return (
        <>
            <Head>
                <title>WISE</title>
            </Head>
            <ThemeProvider theme={theme}>
                <Global />
                {loading ? <Loading /> : <Component {...pageProps} />}
            </ThemeProvider>
        </>
    );
};
export default wrapper.withRedux(WISE);
