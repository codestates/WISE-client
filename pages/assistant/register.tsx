import styled, { createGlobalStyle } from 'styled-components';
import nookies from 'nookies';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import RegisterForm from '../../components/Assistant/RegisterForm';
import Layout from '../../layout/Layout';
import { loadProfileRequest } from '../../actions/user';
import { loadNotificationsRequest } from '../../actions/notifications';
import wrapper from '../../store/configureStore';
import { RootState } from '../../reducers';
import ResultModal from '../../components/ResultModal';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const Register = () => {
    const router = useRouter();
    const { me } = useSelector((state: RootState) => state.user);
    const { addServiceDone } = useSelector((state: RootState) => state.service);

    const [showModal, setShowModal] = useState(false);
    const onCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    useEffect(() => {
        if (!me) {
            router.push('/user/signin');
        }
    }, [me, router]);

    useEffect(() => {
        if (addServiceDone) {
            setShowModal(true);
        }
    }, [addServiceDone]);

    return (
        <Layout title="WISE | SIGNIN">
            <>
                <Global />
                <CoverImg src="/images/wise_bg.png" />
                <Modal>
                    <Header>어시스턴트 프로필 등록</Header>
                    <RegisterForm />
                </Modal>
                {showModal && addServiceDone && (
                    <ResultModal
                        onClose={onCloseModal}
                        title="어시스턴트 등록"
                        message="어시스턴트가 성공적으로 등록되었습니다."
                        redirection="home"
                    />
                )}
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

const CoverImg = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    z-index: -50;
    @media ${(props) => props.theme.tablet} {
        display: none;
    }
`;

const Modal = styled.div`
    // border: 1px solid gray;
    background: white;
    max-width: 1000px;
    border-radius: 2rem;
    padding: 1rem 2rem 0 2rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
    @media ${(props) => props.theme.tablet} {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0;
        box-shadow: none;
    }
`;

const Header = styled.div`
    // border: 1px solid black;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bolder;
`;

export default Register;
