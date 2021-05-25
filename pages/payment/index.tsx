import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from '../../components/Layout';
import AssistantInfo from '../../components/AssistantInfo';
import OrderItem from '../../components/OrderItem';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const Payment = () => (
    <Layout>
        <Global />
        <Wrapper>
            <OrderItem />
            <AssistantInfo />
        </Wrapper>
    </Layout>
);

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3rem;
`;

export default Payment;
