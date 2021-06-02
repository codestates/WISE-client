/* eslint-disable react/jsx-props-no-spreading */
// import App from 'next/app';
import 'antd/dist/antd.css';
import Head from 'next/head';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import { Global } from '../components/style/global';
import wrapper from '../store/configureStore';
import { RootState } from '../reducers';
import theme from '../components/style/theme';

const WISE = ({ Component, pageProps }: AppProps) => {
    const { logOutDone } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (logOutDone) {
            Router.replace('/home');
        }
    }, [logOutDone]);

    return (
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
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default wrapper.withRedux(WISE);
