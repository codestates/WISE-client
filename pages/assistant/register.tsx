/* eslint-disable no-restricted-syntax */
import styled, { createGlobalStyle } from 'styled-components';
import nookies from 'nookies';
import { END } from 'redux-saga';
import RegisterForm from '../../components/Assistant/RegisterForm';
import Layout from '../../layout/Layout';
import { loadProfileRequest } from '../../actions/user';
import { loadNotificationsRequest } from '../../actions/notifications';
import wrapper from '../../store/configureStore';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const Register = () => (
    <Layout title="WISE | SIGNIN">
        <>
            <Global />
            <CoverImg src="/images/wise_bg.png" />
            <Modal>
                <Header>어시스턴트 프로필 등록</Header>
                <RegisterForm />
            </Modal>
        </>
    </Layout>
);

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    context.store.dispatch(loadProfileRequest(cookies.userId));
    context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

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
    max-width: 1000px;
    border-radius: 2rem;
    padding: 1rem 2rem 0 2rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
`;

const Header = styled.div`
    // border: 1px solid black;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bolder;
`;

export default Register;
