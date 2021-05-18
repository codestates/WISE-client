import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from '../../../components/Layout';
import Navigation from '../../../components/ServiceDetail/Navigation';
import Summary from '../../../components/ServiceDetail/Summary';
import Description from '../../../components/ServiceDetail/Description';
import Review from '../../../components/ServiceDetail/Review';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
    .Summary__Wrapper-sc-1wbecrp-0{
      position: sticky;
      top: 0;
      z-index: 10;
    }
`;

const Payment = () => (
    <Layout>
        <Global />
        <Wrapper>
            <Container>
                <Detail>
                    <CoverImg src="/images/sample_photo.jpeg" alt="샘플이미지" />
                    <Navigation />
                    <Description />
                </Detail>
                <Summary />
            </Container>
            <Review />
        </Wrapper>
    </Layout>
);

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 3rem;
`;
const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const Detail = styled.div`
    flex: 6 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const CoverImg = styled.img`
    width: 100%;
    height: 28rem;
    object-fit: cover;
    max-width: 42rem;
`;

export default Payment;
