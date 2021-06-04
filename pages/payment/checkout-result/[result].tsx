import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { END } from 'redux-saga';
import nookies from 'nookies';
import { useSelector } from 'react-redux';
import { WarningBox, ActionButton } from '../../../components/style/style';
import Layout from '../../../layout/Layout';
import PaymentResult from '../../../components/payment/PaymentResult';
import { loadNotificationsRequest } from '../../../actions/notifications';
import { loadProfileRequest } from '../../../actions/user';
import wrapper from '../../../store/configureStore';
import { checkoutRequest } from '../../../actions/payment';
import { loadOrderInfoRequest } from '../../../actions/order';
import { RootState } from '../../../reducers';

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
    const { me } = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if (!me) {
            router.push('/user/signin');
        }
    }, [router, me]);

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
    if (cookies.userId && cookies.token) {
        context.store.dispatch(loadProfileRequest(cookies.userId));
        context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
    } else {
        return {
            redirect: {
                permanent: false,
                destination: '/user/signin',
            },
        };
    }
    // 결제금액이 위변조되지는 않았는지 확인하고나서 결제 성공 여부를 결정하기 위해 서버에 요청을 날림
    const result = context.params;
    if (result) {
        context.store.dispatch(checkoutRequest(result.orderId, result.imp_uid));
        context.store.dispatch(loadOrderInfoRequest(result.orderId, cookies.token));
    }

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default Payment;
