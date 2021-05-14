import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import SigninForm from '../../components/user/SigninForm';

const Global = createGlobalStyle`
  footer {
    visibility:hidden;
  }
`;

const Signin = (): JSX.Element => {
    const router = useRouter();
    const onClickSignup = () => {
        router.push('/user/signup');
    };
    return (
        <Layout>
            <Global />
            <Overlay>
                <Modal>
                    <Header>로그인</Header>
                    <Body>
                        <SigninForm />
                    </Body>
                    <Footer>
                        <span onClick={onClickSignup}>회원가입</span>
                    </Footer>
                </Modal>
            </Overlay>
        </Layout>
    );
};

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 93%;
    display: flex;
    background-image: url('/images/wise_bg.png');
    background-size: 1920px;
    background-position: center;
    max-width: 1920px;
    z-index: 50;
    &:before {
        content: '';
        opacity: 0.3;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: #000;
    }
`;

const Modal = styled.div`
    // border: 1px solid black;
    background: white;
    width: 30rem;
    height: 40rem;
    border-radius: 2rem;
    padding: 3rem 2rem 2rem 2rem;
    z-index: 500;
    margin: 3rem auto auto auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-weight: 600;
`;

const Header = styled.div`
    // border: 1px solid black;
    position: relative;
    font-size: 2rem;
    font-weight: bolder;
`;

const Body = styled.div`
    // border: 1px solid black;
    height: 70%;
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
    height: 5%;
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
