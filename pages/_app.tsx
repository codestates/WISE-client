// import App from 'next/app';
import { AppProps /* , AppContext */ } from 'next/app'; // 타입 임포트
import { ReactElement } from 'react';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import 'antd/dist/antd.css';

const WrappedApp = ({ Component, pageProps }: AppProps): ReactElement => (
    <>
        <Head>
            <title>WISE</title>
        </Head>
        <Component {...pageProps} />
    </>
);

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

export default wrapper.withRedux(WrappedApp);
