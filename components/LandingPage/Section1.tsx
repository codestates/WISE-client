import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';

const Section1 = (): ReactElement => (
    <Wrapper>
        <CoverImg src="/images/wise_bg.png" />
        <Text>
            <h1>
                건강한 시니어 <br />
                라이프를 위해
            </h1>
            <p>병원은 저희가 같이 동행해 드릴게요.</p>
            <Link href="/">
                <StartBtn>시작하기</StartBtn>
            </Link>
        </Text>
    </Wrapper>
);

const Wrapper = styled.div`
    height: 100vh;
`;

const CoverImg = styled.img`
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    z-index: -1;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    margin: 12% 0 0 15%;
    color: #222;
    h1 {
        font-size: 3rem;
    }
    p {
        font-size: 1.3rem;
    }
`;

const StartBtn = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 500;
    font-size: 1.2rem;
    background-color: #68d480;
    border-radius: 3rem;
    height: 2.8rem;
    width: 13rem;
    cursor: pointer;
`;

export default Section1;
