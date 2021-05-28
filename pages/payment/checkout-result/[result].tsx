import { useRouter } from 'next/router';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ActionButton, WarningBox } from '../../../components/button-style';
import Layout from '../../../components/Layout';
import PaymentResult from '../../../components/PaymentResult';

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

const Payment = () => {
    const router = useRouter();
    const result = router.query;
    console.log(result);

    return (
        <>
            {result.error_msg ? (
                <Layout title="Checkout">
                    <>
                        <Global />
                        <WarningBox>
                            <Link href="/home">
                                <a>
                                    <ExclamationCircleOutlined />
                                    <div style={{ fontSize: '1rem' }}>{result.error_msg}</div>
                                    <ActionButton>홈으로 돌아가기</ActionButton>
                                </a>
                            </Link>
                        </WarningBox>
                    </>
                </Layout>
            ) : (
                <Layout title="Payment result">
                    <>
                        <Global />
                        <PaymentResult result={result} />
                    </>
                </Layout>
            )}
        </>
    );
};

export default Payment;
