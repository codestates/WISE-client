import Link from 'next/link';
import { ReactElement } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';

const Global = createGlobalStyle`
  #__next {
    height: 100%;

  }

  header {
    position: sticky;
    top: 0;
  }
`;

const LandingPage = (): ReactElement => (
    <>
        <Layout>
            <Global />
            <FirstWrapper>
                <CoverImg src="/images/landing-page-img.png" />
                <Text>
                    <h1>건강한 시니어 라이프를 위해</h1>
                    <h3>병원은 저희가 같이 동행해 드릴게요.</h3>
                    <Link href="/">
                        <a>시작하기</a>
                    </Link>
                </Text>
            </FirstWrapper>
            <SecondWrapper>
                <h1>건강한 시니어 라이프를 위해</h1>
                <h3>병원은 저희가 같이 동행해 드릴게요.</h3>
            </SecondWrapper>
        </Layout>
    </>
);

const FirstWrapper = styled.div`
    height: 100%;
`;

const SecondWrapper = styled.div`
    height: 100%;
`;

const CoverImg = styled.img`
    width: 60rem;
    height: 40rem;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25%;
`;

export default LandingPage;
