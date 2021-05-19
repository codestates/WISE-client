import React, { useCallback, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import AssistantInfo from '../../../components/AssistantInfo';
import Reservation from '../../../components/Reservation';
import { getSingleServiceAction } from '../../../actions/service';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const ReservationDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const { service } = useSelector((state) => state.service);
    const dispatch = useDispatch();
    console.log(service);

    const handleClickServiceDetail = useCallback(() => {
        dispatch(getSingleServiceAction(id));
        console.log('aaaa');
    }, [id]);

    useEffect(() => {
        if (id) {
            handleClickServiceDetail();
        }
    }, [id]);
    return (
        <>
            {service ? (
                <Layout>
                    <Global />
                    <Wrapper>
                        <Reservation id={id} />
                        <AssistantInfo service={service} />
                    </Wrapper>
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
    justify-content: space-between;
    padding: 3rem;
`;

export default ReservationDetail;
