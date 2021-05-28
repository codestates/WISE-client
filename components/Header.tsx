/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import NotificationModal from './NotificationModal';
import { RootState } from '../reducers';
import { logoutRequest } from '../actions/user';

const Header = () => {
    const dispatch = useDispatch();
    const { me, islogin, logOutDone } = useSelector((state: RootState) => state.user);

    const [showModal, setShowModal] = useState(false);

    const onClickModal = useCallback(() => {
        setShowModal((state) => !state);
        console.log('clicked!');
    }, []);
    // const onCloseModal = useCallback(() => {
    //     setShowModal(false);
    //     console.log('clicked!');
    // }, []);

    useEffect(() => {
        if (logOutDone) {
            Router.replace('/home');
        }
    }, [logOutDone]);

    const Logout = useCallback(() => {
        dispatch(logoutRequest());
    }, [dispatch]);

    const Login = useCallback(() => {
        Router.replace('/user/signin');
    }, []);

    return (
        <>
            <Wrapper>
                <Container>
                    <Link href="/home">
                        <Logo src="/images/WISE.png" alt="WISE logo" />
                    </Link>
                    <UserTap>
                        <div style={{ width: '8rem' }}>
                            {islogin ? (
                                <>
                                    {me?.isAssistant ? (
                                        <Link href="/assistant/Center">
                                            <AssistantBtn>어시스턴트 센터</AssistantBtn>
                                        </Link>
                                    ) : (
                                        <Link href="/assistant/register">
                                            <AssistantBtn>어시스턴트 등록</AssistantBtn>
                                        </Link>
                                    )}
                                </>
                            ) : null}
                        </div>
                        <div onClick={onClickModal}>
                            {showModal ? (
                                <BellOutlined
                                    style={{
                                        fontSize: '1.5rem',
                                        lineHeight: '2rem',
                                        color: '#68d480',
                                        cursor: 'pointer',
                                    }}
                                />
                            ) : (
                                <BellOutlined style={{ fontSize: '1.5rem', lineHeight: '2rem', cursor: 'pointer' }} />
                            )}
                        </div>
                        {showModal && <NotificationModal />}
                        <UserOutlined style={{ fontSize: '1.5rem', lineHeight: '2rem' }} />
                        {me ? (
                            <LoginBtn onClick={Logout}>로그아웃</LoginBtn>
                        ) : (
                            <LoginBtn onClick={Login}>로그인</LoginBtn>
                        )}
                    </UserTap>
                </Container>
            </Wrapper>
        </>
    );
};

const AssistantBtn = styled.div`
    cursor: pointer;
`;

const Wrapper = styled.header`
    height: 4rem;
    width: 100%;
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    /* glassmorphism effect */
    box-shadow: 0 8px 32px 0 rgba(160, 160, 160, 0.37);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 0.3rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
    z-index: 1;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
`;

const Logo = styled.img`
    width: 4rem;
    cursor: pointer;
`;

const UserTap = styled.div`
    // border: 1px solid black;
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LoginBtn = styled.div`
    color: #fff;
    font-weight: bolder;
    text-align: center;
    line-height: 2rem;
    border: none;
    border-radius: 1rem;
    background-color: #68d480;
    width: 4rem;
    height: 2rem;
    cursor: pointer;
`;

export default Header;
