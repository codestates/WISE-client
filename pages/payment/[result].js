import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createGlobalStyle } from 'styled-components';
import Layout from '../../components/Layout';
import PaymentResult from '../../components/PaymentResult';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
    .fxIoCz {
        height: 100%;
        display: flex;
        justify-content: center;
    }
`;

const Payment = (): ReactElement => {
    const router = useRouter();
    const result = router.query;
    console.log(result);

    return (
        <Layout>
            <Global />
            <PaymentResult result={result} />
        </Layout>
    );
};

export default Payment;
