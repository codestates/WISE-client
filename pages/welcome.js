import Link from 'next/link';
import { useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const Welcome = () => {
    const { me } = useSelector((state) => state.user);
    console.log(me);
    return (
        <Layout title="WISE | HOME">
            <Global />
            <CoverImg src="/images/wise_bg.png" />
            <Wrapper>
                <Content>
                    <h2>환영합니다!</h2>
                    <p>
                        안녕하세요, 회원님.
                        <br />
                        WISE를 이용해 주셔서 감사합니다.
                        <br />
                        회원님이 주신 소중한 정보는 안전하게 관리하겠습니다.
                    </p>
                </Content>
                <Linker>
                    <Link href="/">
                        <HomeBtn>홈으로가기</HomeBtn>
                    </Link>
                    <Link href="/">
                        <RigisterBtn>어시스턴트 등록하기</RigisterBtn>
                    </Link>
                </Linker>
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15rem;
`;

const Content = styled.div`
    // border: 1px solid black;
    // padding: 2rem;
`;

const Linker = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
`;

const HomeBtn = styled.div`
    width: 5rem;
    height: 5rem;
    text-align: center;
    line-height: 5rem;
    border-radius: 5rem;
    background-color: #68d480;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
    cursor: pointer;
`;

const RigisterBtn = styled.div`
    width: 5rem;
    height: 5rem;
    text-align: center;
    padding-top: 1rem;
    border-radius: 5rem;
    background-color: white;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
    cursor: pointer;
`;

const CoverImg = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    z-index: -50;
`;

export default Welcome;