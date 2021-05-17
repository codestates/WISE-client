import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import Layout from '../../components/Layout';
import SignupForm from '../../components/user/SignupForm';

const Global = createGlobalStyle`
  footer {
    position: absolute;
    visibility:hidden;
  }
`;

const Signin = () => {
    return (
        <Layout title="WISE | SIGNUP">
            <Global />
            <CoverImg src="/images/wise_bg.png" />
            <Modal>
                <Header>회원가입</Header>
                <Body>
                    <SignupForm />
                </Body>
                <Footer>
                    <Link href="/user/signin">
                        <a>
                            이미 계정이 있으신가요?&nbsp;&nbsp;
                            <span>로그인</span>
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
    // border: 1px solid black;
    background: white;
    width: 30rem;
    height: 50rem;
    border-radius: 2rem;
    padding: 2rem 2rem 1rem 2rem;
    z-index: 500;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-weight: 600;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
`;

const Header = styled.div`
    // border: 1px solid black;
    position: relative;
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
    font-weight: 400;
    color: #999;
    span {
        font-weight: 600;
        color: #72cd87;
        cursor: pointer;
    }
`;

export default Signin;
