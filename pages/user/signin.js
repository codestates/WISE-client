import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import SigninForm from '../../components/user/SigninForm';
import { loadMyInfo } from '../../reducers/user';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const Signin = () => {
    const dispatch = useDispatch();
    const { logInDone, me } = useSelector((state) => state.user);

    useEffect(() => {
        if (logInDone) {
            dispatch(loadMyInfo());
        }
    }, [logInDone]);

    useEffect(() => {
        if (me) {
            Router.replace('/welcome');
        }
    }, [me]);

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

export default Signin;
