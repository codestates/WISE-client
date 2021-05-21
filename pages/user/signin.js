import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Layout from '../../components/Layout';
import SigninForm from '../../components/user/SigninForm';
import wrapper from '../../store/configureStore';
import { loadMyInfo } from '../../reducers/user';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const Signin = () => {
    const dispatch = useDispatch();
    const { logInDone } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadMyInfo());
    }, []);
    useEffect(() => {
        if (logInDone) {
            Router.replace('/welcome');
        }
    }, [logInDone]);

    return (
        <Layout title="WISE | SIGNIN">
            <Global />
            <CoverImg src="/images/wise_bg.png" />
            <Modal>
                <Header>로그인</Header>
                <SigninForm />
                <Footer>
                    <Link href="/user/signupAuth">
                        <a>
                            <span>회원가입</span>
                        </a>
                    </Link>
                </Footer>
            </Modal>
        </Layout>
    );
};

const CoverImg = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    z-index: -50;
`;

const Modal = styled.div`
    // border: 1px solid gray;
    background: white;
    width: 30rem;
    height: 40rem;
    border-radius: 2rem;
    padding: 2rem 2rem 2rem 2rem;
    z-index: 500;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-weight: 600;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
`;

const Header = styled.div`
    // border: 1px solid black;
    font-size: 2rem;
    font-weight: bolder;
`;

const Footer = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
        font-weight: 400;
        color: #999;
        cursor: pointer;
    }
`;

// export const getServerSideProps = wrapper.getServerSideProps((context) => {
//     console.log('getServerSideProps start');
//     console.log(context.req.headers);
//     const cookie = context.req ? context.req.headers.cookie : '';
//     axios.defaults.headers.Cookie = '';
//     if (context.req && cookie) {
//         axios.defaults.headers.Cookie = cookie;
//     }
//     context.store.dispatch(loadMyInfo());
//     // context.store.dispatch(END);
//     console.log('getServerSideProps end');
//     // await context.store.sagaTask.toPromise();
// });

export default Signin;
