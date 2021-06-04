/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';
import { BellOutlined } from '@ant-design/icons';
import nookies from 'nookies';
import { RootState } from '../reducers';
import { logoutRequest } from '../actions/user';
import NotificationModal from '../components/Notifications/NotificationModal';
import { Notification } from '../interfaces/data/notifications';

const Header = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state: RootState) => state.user);
    const { notifications } = useSelector((state: RootState) => state.notifications);
    const [showModal, setShowModal] = useState(false);
    const [unchecked, setUnchecked] = useState(0);
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        if (notifications) {
            const uncheckedNotifications = notifications.filter(
                (notification: Notification) => !notification.isChecked,
            ).length;
            setUnchecked(uncheckedNotifications);
        }
    }, [notifications]);

    const onClickModal = useCallback(() => {
        setShowModal((state) => !state);
        console.log('clicked!');
    }, []);

    const onCloseModal = useCallback(() => {
        setShowModal(false);
        console.log('clicked!');
    }, []);

    const handleToggle = useCallback(() => {
        setVisible((state) => !state);
    }, []);

    const Logout = useCallback(() => {
        nookies.destroy(null, 'token');
        nookies.destroy(null, 'userId');
        dispatch(logoutRequest());
    }, [dispatch]);

    const Login = useCallback(() => {
        Router.replace('/user/signin');
    }, []);

    const Mypage = useCallback(() => {
        Router.push(`/user/mypage`);
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
                            {me ? (
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
                                    <>
                                        {unchecked > 0 ? <NotiNum>{unchecked}</NotiNum> : ''}
                                        <BellOutlined
                                            style={{
                                                color: '#68d480',
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {unchecked > 0 ? <NotiNum>{unchecked}</NotiNum> : ''}
                                        <BellOutlined />
                                    </>
                                ))}
                        </div>
                        {showModal && <NotificationModal onClose={onCloseModal} />}
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
                    <Responsive>
                        <div onClick={onClickModal}>
                            {me &&
                                (showModal ? (
                                    <>
                                        {unchecked > 0 ? <NotiNum>{unchecked}</NotiNum> : ''}
                                        <BellOutlined
                                            style={{
                                                color: '#68d480',
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {unchecked > 0 ? <NotiNum>{unchecked}</NotiNum> : ''}
                                        <BellOutlined />
                                    </>
                                ))}
                        </div>
                        {showModal && <NotificationModal onClose={onClickModal} />}

                        <HamburgerButton visible={isVisible} onClick={handleToggle}>
                            <span />
                            <span />
                            <span />
                            <span />
                        </HamburgerButton>
                        <Overlay visible={isVisible}>
                            <>
                                {me &&
                                    (me.image ? (
                                        <Avatar src={process.env.NEXT_PUBLIC_imageURL + me.image} alt="avatar" />
                                    ) : (
                                        <Avatar src="/images/avatar_default.png" alt="avatar" />
                                    ))}
                                <Name>{me?.name}</Name>
                                <Email>{me?.email}</Email>
                                <div style={{ borderTop: '1px solid black', marginBottom: '20%' }} />
                            </>
                            <Service>
                                {me ? (
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
                            </Service>
                            {me ? (
                                <User style={{ cursor: 'pointer' }} onClick={Mypage}>
                                    마이페이지
                                </User>
                            ) : null}
                            {me ? (
                                <>
                                    <i className="material-icons" style={{ marginLeft: '11%' }}>
                                        logout
                                    </i>{' '}
                                    <span style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={Logout}>
                                        로그아웃
                                    </span>
                                </>
                            ) : (
                                <>
                                    <i className="material-icons" style={{ marginLeft: '11%' }}>
                                        login
                                    </i>{' '}
                                    <span style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={Login}>
                                        로그인
                                    </span>
                                </>
                            )}
                        </Overlay>
                    </Responsive>
                </Container>
            </Wrapper>
        </>
    );
};

const User = styled.div`
    font-size: 1.5rem;
    margin-left: 11%;
    margin-bottom: 57%;
`;

const Service = styled.div`
    font-size: 1.5rem;
    margin-left: 11%;
    margin-bottom: 2%;
`;

const Name = styled.div`
    margin-left: 11%;
    font-size: 1.5rem;
`;

const Email = styled.div`
    margin-left: 11%;
    font-size: 1.5rem;
    margin-bottom: 3%;
`;

const Overlay = styled.div`
    width: 100%;
    height: 1200px;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 1000;
    transition: all 0.35s;
    right: ${(props) => (props.visible ? '0px' : '-100%')};
    visibility: ${(props) => (props.visible ? null : 'hidden')};
`;

const HamburgerButton = styled.div`
    transition: 0.3s ease-in-out;
    width: 22px;
    height: 62px;
    display: block;
    top: 2rem;
    z-index: 1100;
    cursor: pointer;
    span {
        position: absolute;
        display: block;
        height: 3px;
        border-radius: 4px;
        width: 20px;
        top: 0;
        transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
        background-color: #3d4146;
    }
    span:nth-child(1) {
        top: 23px;
        opacity: ${(props) => (props.visible ? '0' : null)};
    }
    span:nth-child(2) {
        top: 29px;
        transform: ${(props) => (props.visible ? 'rotate(45deg)' : null)};
    }
    span:nth-child(3) {
        top: 29px;
        transform: ${(props) => (props.visible ? 'rotate(-45deg)' : null)};
    }
    span:nth-child(4) {
        top: 35px;
        opacity: ${(props) => (props.visible ? '0' : null)};
    }
`;

const Avatar = styled.img`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #d2d2d2;
    margin-right: 5px;

    @media ${(props) => props.theme.mobile} {
        height: 6rem;
        width: 6rem;
        margin-left: 11%;
        margin-top: 11%;
        margin-bottom: 7%;
    }
`;

const AssistantBtn = styled.div`
    cursor: pointer;
`;

const Wrapper = styled.header`
    position: relative;
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
    z-index: 1100;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    height: 62px;
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
    @media ${(props) => props.theme.mobile} {
        display: none;
    }
`;

const Responsive = styled.div`
    display: none;
    @media ${(props) => props.theme.mobile} {
        display: flex;
        flex-direction: row;
        svg {
            font-size: 1.5rem;
            line-height: 2rem;
            cursor: pointer;
            margin-right: 1.2rem;
            margin-top: 18px;
        }
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

const NotiNum = styled.div`
    position: absolute;
    margin: -0.5rem 0 0 1.2rem;
    border-radius: 1rem;
    width: 1.4rem;
    height: 1.4rem;
    background: #f04646;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Header;
