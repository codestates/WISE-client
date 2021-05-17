import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="ko">
                <Head>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                    {/* jQuery */}
                    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
                    {/* iamport.payment.js */}
                    <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js" />
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
