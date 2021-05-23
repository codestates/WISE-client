import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';
import SignupForm from '../../components/user/SignupForm';
import Layout from '../../components/Layout';
import { loadMyInfo } from '../../reducers/user';
import { AuthGlobal, CoverImg, Modal, ModalTitle } from '../../components/user/styles';

const Signup = () => {
    const dispatch = useDispatch();
    const { signUpDone, me } = useSelector((state) => state.user);

    useEffect(() => {
        if (signUpDone) {
            dispatch(loadMyInfo());
        }
    }, [signUpDone]);

    useEffect(() => {
        if (me) {
            Router.replace('/welcome');
        }
    }, [me]);

    return (
        <Layout title="WISE | SIGNUP">
            <AuthGlobal />
            <CoverImg filter />
            <Modal>
                <ModalTitle>회원가입</ModalTitle>
                <SignupForm />
            </Modal>
        </Layout>
    );
};

export default Signup;
