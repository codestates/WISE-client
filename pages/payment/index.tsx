import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Layout from '../../components/Layout';
import AssistantInfo from '../../components/AssistantInfo';
import OrderItem from '../../components/OrderItem';
import { RootState } from '../../reducers/index';
import wrapper from '../../store/configureStore';
import { GET_RESERVATION_INFO_REQUEST, GET_SERVICE_INFO_REQUEST } from '../../reducers/service';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const Payment = () => {
    const { service, getReservationInfo } = useSelector((state: RootState) => state.service);

    return (
        <Layout>
            <Global />
            <Wrapper>
                <OrderItem />
                <AssistantInfo service={service} hours={getReservationInfo.hours} />
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3rem;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const { accessToken } = useSelector((state: RootState) => state.user);

    context.store.dispatch({
        type: GET_SERVICE_INFO_REQUEST,
        serviceId: context.params?.id,
    });

    context.store.dispatch({
        type: GET_RESERVATION_INFO_REQUEST,
        reservationId: context.params?.id,
        accessToken,
    });

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});
export default Payment;
