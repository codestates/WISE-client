import React, { ReactElement } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';
// import PaymentResult from '../components/PaymentResult';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const Payment = (): ReactElement => (
    <Layout>
        <Global />
        <Wrapper>{/* <PaymentResult /> */}</Wrapper>
    </Layout>
);

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3rem;
`;

export default Payment;
