import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';
import SignupForm from '../../components/user/SignupForm';
import Layout from '../../components/Layout';
import { AuthGlobal, CoverImg, Modal, ModalTitle } from '../../components/user/styles';
import { RootState } from '../../reducers';
import { loadMyInfoRequest } from '../../actions/user';

const Signup = () => {
    const dispatch = useDispatch();
    const { signUpDone, me } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (signUpDone) {
            dispatch(loadMyInfoRequest());
        }
    }, [signUpDone, dispatch]);

    useEffect(() => {
        if (me) {
            Router.replace('/welcome');
        }
    }, [me]);

    return (
        <Layout title="WISE | SIGNUP">
            <>
                <AuthGlobal />
                <CoverImg filter="true" />
                <Modal>
                    <ModalTitle>회원가입</ModalTitle>
                    <SignupForm />
                </Modal>
            </>
        </Layout>
    );
};

export default Signup;
