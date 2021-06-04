/* eslint-disable consistent-return */
import Link from 'next/link';
import nookies from 'nookies';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { RootState } from '../reducers';
import Layout from '../layout/Layout';
import { CoverImg } from '../components/style/authStyle';
import { AuthGlobal } from '../components/style/global';
import wrapper from '../store/configureStore';
import { loadProfileRequest } from '../actions/user';
import { loadNotificationsRequest } from '../actions/notifications';

const Welcome = () => {
    const router = useRouter();
    const { me } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!me) {
            router.push('/user/signin');
        }
    }, [router, me]);

    return (
        <Layout title="WISE | WELCOME">
            <>
                <AuthGlobal />
                <CoverImg />
                <Wrapper>
                    <div>
                        <h2>환영합니다!</h2>
                        <p>
                            안녕하세요, {me?.name}회원님.
                            <br />
                            WISE를 이용해 주셔서 감사합니다.
                            <br />
                            회원님이 주신 소중한 정보는 안전하게 관리하겠습니다.
                        </p>
                    </div>
                    <Linker>
                        <Link href="/home">
                            <LinkBtn home>홈으로가기</LinkBtn>
                        </Link>
                        <Link href="/assistant/register">
                            <LinkBtn>어시스턴트 등록하기</LinkBtn>
                        </Link>
                    </Linker>
                </Wrapper>
            </>
        </Layout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    if (cookies.userId && cookies.token) {
        context.store.dispatch(loadProfileRequest(cookies.userId));
        context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
        context.store.dispatch(END);
        await context.store.sagaTask?.toPromise();
    } else {
        return {
            redirect: {
                permanent: false,
                destination: '/user/signin',
            },
        };
    }
});

const Wrapper = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30vh;
    margin-top: 13rem;
`;

const Linker = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
`;

const LinkBtn = styled.div<{ home?: boolean }>`
    width: 5rem;
    height: 5rem;
    text-align: center;
    border-radius: 5rem;
    background-color: ${(props) => (props.home ? '#68d480' : 'white')};
    padding-top: ${(props) => (props.home ? '2rem' : '1rem')};
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
    cursor: pointer;
`;

export default Welcome;
