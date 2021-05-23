import React, { useState, useCallback, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import AssistantInfo from '../../../components/AssistantInfo';
import Reservation from '../../../components/Reservation';
import { GET_SERVICE_INFO_REQUEST } from '../../../reducers/service';
import { loadMyInfo, LOG_IN_SUCCESS } from '../../../reducers/user';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const ReservationDetail = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch({
                type: LOG_IN_SUCCESS,
            });
            dispatch(loadMyInfo());
        }
    }, []);
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const { service } = useSelector((state) => state.service);
    console.log(service);

    const handleClickServiceDetail = useCallback(() => {
        dispatch({
            type: GET_SERVICE_INFO_REQUEST,
            serviceId: id,
        });
        console.log('aaaa');
    }, [id]);

    useEffect(() => {
        if (id) {
            handleClickServiceDetail();
        }
    }, [id]);

    const [hours, setHours] = useState(1);

    const handleChangehours = useCallback((value) => {
        setHours(value);
    }, []);

    return (
        <>
            {service ? (
                <Layout>
                    <Global />
                    <Wrapper>
                        <Reservation service={service} id={id} handleChangehours={handleChangehours} hours={hours} />
                        <AssistantInfo service={service} hours={hours} />
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
