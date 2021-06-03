import { useRouter } from 'next/router';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { END } from 'redux-saga';
import nookies from 'nookies';
import { WarningBox, ActionButton } from '../../../components/style/style';
import Layout from '../../../layout/Layout';
import PaymentResult from '../../../components/payment/PaymentResult';
import { loadNotificationsRequest } from '../../../actions/notifications';
import { loadProfileRequest } from '../../../actions/user';
import wrapper from '../../../store/configureStore';

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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    context.store.dispatch(loadProfileRequest(cookies.userId));
    context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default Payment;
