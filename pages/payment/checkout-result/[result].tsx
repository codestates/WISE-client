import { useRouter } from 'next/router';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import PaymentResult from '../../../components/PaymentResult';
import wrapper from '../../../store/configureStore';
import { GET_RESERVATION_INFO_REQUEST } from '../../../interfaces/act/service';
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
    console.log(result);

    const { accessToken } = useSelector((state: RootState) => state.user);
    const { getReservationInfo } = useSelector((state: RootState) => state.service);

    return (
        <Layout title="Payment result">
            <>
                <Global />
                <PaymentResult result={result} order={getReservationInfo} accessToken={accessToken} />
            </>
        </Layout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const { accessToken } = useSelector((state: RootState) => state.user);

    context.store.dispatch({
        type: GET_RESERVATION_INFO_REQUEST,
        orderId: context.params?.id,
        accessToken,
    });

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default Payment;
