/* eslint-disable no-restricted-syntax */
import styled, { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { loadMyInfo } from '../../reducers/user';
import RegisterForm from '../../components/Assistant/RegisterForm/index';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const register = () => {
    const dispatch = useDispatch();

    const { me } = useSelector((state) => state.user);
    useEffect(() => {
        if (!me) {
            const userId = localStorage.getItem('userId');
            if (userId) {
                dispatch(loadMyInfo());
            } else {
                Router.replace('/user/signin');
            }
        }
    }, [me]);

    return (
        <Layout title="WISE | SIGNIN">
            <Global />
            <CoverImg src="/images/wise_bg.png" />
            <Modal>
                <Header>어시스턴트 프로필 등록</Header>
                <RegisterForm />
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
    max-width: 1000px;
    border-radius: 2rem;
    padding: 1rem 2rem 0 2rem;
    margin-top: 2rem;
    z-index: 500;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
`;

const Header = styled.div`
    // border: 1px solid black;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bolder;
`;

export default register;
