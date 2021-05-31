/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';
import { BellOutlined } from '@ant-design/icons';
import { RootState } from '../reducers';
import { logoutRequest } from '../actions/user';
import NotificationModal from '../components/NotificationModal';

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
                        <div>
                            {islogin ? (
                                <>
                                    {me?.service ? (
                                        <Link href="/assistant/center">
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
                            {me &&
                                (showModal ? (
                                    <BellOutlined
                                        style={{
                                            color: '#68d480',
                                        }}
                                    />
                                ) : (
                                    <BellOutlined />
                                ))}
                        </div>
                        {showModal && <NotificationModal />}
                        <Link href="/user/mypage">
                            <a>
                                {me &&
                                    (me.image ? (
                                        <Avatar src={process.env.NEXT_PUBLIC_imageURL + me.image} alt="avatar" />
                                    ) : (
                                        <Avatar src="/images/avatar_default.png" alt="avatar" />
                                    ))}
                                {me?.name}
                            </a>
                        </Link>
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
const Avatar = styled.img`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #d2d2d2;
    margin-right: 5px;
`;

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
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
        font-size: 1.5rem;
        line-height: 2rem;
        cursor: pointer;
    }
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
