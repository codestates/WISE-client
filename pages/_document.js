import Document, { Html, Head, Main, NextScript } from 'next/document';
// import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    // static async getInitialProps(ctx) {
    //     const sheet = new ServerStyleSheet();
    //     const originalRenderPage = ctx.renderPage;
    //     try {
    //         ctx.renderPage = () =>
    //             originalRenderPage({
    //                 enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
    //             });
    //         const initialProps = await Document.getInitialProps(ctx);
    //         return {
    //             ...initialProps,
    //             styles: (
    //                 <>
    //                     {initialProps.styles}
    //                     {sheet.getStyleElement()}
    //                 </>
    //             ),
    //         };
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         sheet.seal();
    //     }
    // }

    render() {
        return (
            <Html lang="ko">
                <Head>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                    {/* jQuery */}
                    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
                    {/* iamport.payment.js */}
                    <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js" />
                    <script
                        type="text/javascript"
                        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1BruN8Ydm9vhtJPJe4PiFyBhLqBiVE9k&libraries=places"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
