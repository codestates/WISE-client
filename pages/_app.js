/* eslint-disable */
// import App from 'next/app';
import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from 'prop-types';

import wrapper from '../store/configureStore';

const WISE = ({ Component, pageProps }) => (
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

WISE.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(WISE);
