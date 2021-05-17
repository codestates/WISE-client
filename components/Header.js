import Link from 'next/link';
import styled from 'styled-components';

const Header = () => (
    <>
        <Wrapper>
            <Container>
                <Link href="/">
                    <a>
                        <Logo src="/images/WISE.png" alt="WISE logo" />
                    </a>
                </Link>
                <Link href="/user/signin">
                    <LoginBtn>로그인</LoginBtn>
                </Link>
            </Container>
        </Wrapper>
    </>
);

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
`;

const LoginBtn = styled.a`
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
