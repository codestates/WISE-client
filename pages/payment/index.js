import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import AssistantInfo from '../../components/AssistantInfo';
import OrderItem from '../../components/OrderItem';
import { loadMyInfo, LOG_IN_SUCCESS } from '../../reducers/user';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const Payment = () => {
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
    return (
        <Layout>
            <Global />
            <Wrapper>
                <OrderItem />
                <AssistantInfo />
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

export default Payment;
