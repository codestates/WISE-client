import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import AssistantInfo from '../../../components/AssistantInfo';
import { RootState } from '../../../reducers/index';
import wrapper from '../../../store/configureStore';
import { GET_RESERVATION_INFO_REQUEST, GET_SERVICE_INFO_REQUEST } from '../../../interfaces/act/service';
import ReservationInfo from '../../../components/ReservationInfo';
import OrderItem from '../../../components/OrderItem';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const Payment = () => {
    // const router = useRouter();
    // const { id } = router.query;
    // console.log(id);

    const { service, getReservationInfo } = useSelector((state: RootState) => state.service);

    return (
        <Layout title="Checkout">
            <>
                <Global />
                <Wrapper>
                    <Title>
                        <Link href="/">
                            <i className="material-icons">chevron_left</i>
                        </Link>
                        <h1>결제하기</h1>
                    </Title>
                    <ReservationInfo reservationInfo={getReservationInfo} />
                    <OrderItem reservationInfo={getReservationInfo} />
                    <AssistantInfo service={service} hours={getReservationInfo.hours} />
                </Wrapper>
            </>
        </Layout>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3rem;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // const { accessToken } = useSelector((state: RootState) => state.user);
    const state = context.store.getState();
    console.log('getState*************', state);
    context.store.dispatch({
        type: GET_SERVICE_INFO_REQUEST,
        serviceId: context.params?.id,
    });

    // context.store.dispatch({
    //     type: GET_RESERVATION_INFO_REQUEST,
    //     reservationId: context.params?.id,
    //     accessToken,
    // });

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});
export default Payment;
