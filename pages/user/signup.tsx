import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../../layout/Layout';
import { RootState } from '../../reducers';

import { CoverImg, Modal, ModalTitle } from '../../components/style/authStyle';
import SignupForm from '../../components/auth/SignupForm';
import { loadProfileRequest } from '../../actions/user';
import { AuthGlobal } from '../../components/style/global';

const Signup = () => {
    const dispatch = useDispatch();
    const { signUpDone, me } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (signUpDone) {
            dispatch(loadProfileRequest(localStorage.getItem('userId') as string));
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
