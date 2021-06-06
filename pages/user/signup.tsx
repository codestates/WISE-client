import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../layout/Layout';
import { RootState } from '../../reducers';

import { CoverImg, Modal, ModalTitle } from '../../components/style/authStyle';
import SignupForm from '../../components/auth/SignupForm';
import { AuthGlobal } from '../../components/style/global';
import Loading from '../../components/Loading';

const Signup = () => {
    const router = useRouter();
    const { signUpLoading, signUpDone, me } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (me && signUpDone) {
            router.push('/welcome');
        }
    }, [me, signUpDone, router]);

    return (
        <>
            {signUpLoading || signUpDone ? (
                <Loading />
            ) : (
                <Layout title="WISE | SIGNUP">
                    <>
                        <AuthGlobal />
                        <CoverImg filter="true" />
                        <Modal style={{ margin: '4rem 0' }}>
                            <ModalTitle>회원가입</ModalTitle>
                            <SignupForm />
                        </Modal>
                    </>
                </Layout>
            )}
        </>
    );
};

export default Signup;
