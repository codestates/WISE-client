import React, { ReactElement } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Header = (): ReactElement => (
    <>
        <Wrapper>
            <Link href="/">
                <a>
                    <Logo src="/images/WISE.png" alt="WISE logo" />
                </a>
            </Link>
            <Link href="#">
                <LoginBtn>로그인</LoginBtn>
            </Link>
        </Wrapper>
    </>
);

const Wrapper = styled.header`
    display: flex;
    height: 4rem;
    width: 100%;
    padding: 0.5rem 2rem;
    align-items: center;
    justify-content: space-between;

    /* glassmorphism effect */
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(160, 160, 160, 0.37);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 0.3rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Logo = styled.img`
    width: 4rem;
`;

const LoginBtn = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.9rem;
    border-radius: 1rem;
    background-color: #68d480;
    width: 4rem;
    height: 2rem;
`;

export default Header;
