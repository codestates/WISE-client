import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { logoutRequestAction } from '../reducers/user';

const Header = () => {
    const dispatch = useDispatch();
    const { me, islogin } = useSelector((state) => state.user);

    const Logout = useCallback(() => {
        dispatch(logoutRequestAction());
    }, []);

    const Login = () => {
        Router.replace('/user/signin');
    };

    return (
        <>
            <Wrapper>
                <Container>
                    <Link href="/">
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
                        <BellOutlined style={{ fontSize: '1.5rem', lineHeight: '2rem' }} />
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
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(160, 160, 160, 0.37);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 0.3rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
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
    div {
        display: inline-block;
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
