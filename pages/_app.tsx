/* eslint-disable react/jsx-props-no-spreading */
// import App from 'next/app';
import 'antd/dist/antd.css';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import type { AppProps } from 'next/app';
import { loadMyInfo } from '../reducers/user';

import wrapper from '../store/configureStore';
import { RootState } from '../reducers';

const Global = createGlobalStyle`
    body{
        // letter-spacing: -75px;
        color: #191919;
    }
    a:hover {
     color: #222;
 }
`;

// https://myeongjae.kim/blog/2020/04/07/next-js-app-functional-component
const WISE = ({ Component, pageProps }: AppProps) => {
    const dispatch = useDispatch();

    const { me } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!me) {
            const userId = localStorage.getItem('userId');
            if (userId) {
                dispatch(loadMyInfo());
            }
        }
    }, [me, dispatch]);

    return (
        <>
            <Head>
                <title>WISE</title>
            </Head>
            <Global />
            <Component {...pageProps} />
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
