/* eslint-disable react/jsx-props-no-spreading */
// import App from 'next/app';
import 'antd/dist/antd.css';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import { Global } from '../components/style/global';
import wrapper from '../store/configureStore';
import { RootState } from '../reducers';
import { loadProfileRequest } from '../actions/user';
import theme from '../components/style/theme';
import { auth } from '../firebase';

const WISE = ({ Component, pageProps }: AppProps) => {
    const dispatch = useDispatch();

    const { me } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(loadProfileRequest());
            }
        });
        // if (!me) {
        //     const userId = localStorage.getItem('userId');
        //     if (userId) {
        //         dispatch(loadProfileRequest());
        //     }
        // }
    }, [dispatch]);

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
