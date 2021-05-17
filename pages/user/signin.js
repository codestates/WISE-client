import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import Layout from '../../components/Layout';
import SigninForm from '../../components/user/SigninForm';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const Signin = () => {
    return (
        <Layout title="WISE | SIGNIN">
            <Global />
            <CoverImg src="/images/wise_bg.png" />
            <Modal>
                <Header>로그인</Header>
                <Body>
                    <SigninForm />
                </Body>
                <Footer>
                    <Link href="/user/signup">
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
    padding: 3rem 2rem 2rem 2rem;
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

const Body = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .ant-radio-group {
        margin: 0 auto;
        height: 2.5rem;
        width: 100%;
    }
    .ant-radio-button-wrapper {
        height: 2.5rem;
        width: 50%;
        text-align: center;
        line-height: 2.5rem;
    }
    .ant-radio-button-checked {
        background-color: #72cd87;
    }
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
