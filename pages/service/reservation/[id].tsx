import React, { useState, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import Layout from '../../../components/Layout';
import AssistantInfo from '../../../components/AssistantInfo';
import Reservation from '../../../components/Reservation';
import { GET_SERVICE_INFO_REQUEST } from '../../../interfaces/act/service';
import wrapper from '../../../store/configureStore';
import { RootState } from '../../../reducers';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const ReservationDetail = () => {
    // const router = useRouter();
    // const { id } = router.query;
    // console.log(id);

    const { service } = useSelector((state: RootState) => state.service);
    console.log(service);

    const [hours, setHours] = useState(1);

    const handleChangehours = useCallback((value) => {
        setHours(value);
    }, []);

    return (
        <>
            {service ? (
                <Layout title="Reservation">
                    <>
                        <Global />
                        <Wrapper>
                            <Reservation service={service} handleChangehours={handleChangehours} hours={hours} />
                            <AssistantInfo service={service} hours={hours} />
                        </Wrapper>
                    </>
                </Layout>
            ) : (
                ''
            )}
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3rem;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    context.store.dispatch({
        type: GET_SERVICE_INFO_REQUEST,
        serviceId: context.params?.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default ReservationDetail;
