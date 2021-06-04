import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers';
import Layout from '../../layout/Layout';
import SigninForm from '../../components/auth/SigninForm';
import Loading from '../../components/Loading';
import { CoverImg, ModalTitle, ModalFooter, Modal } from '../../components/style/authStyle';
import { AuthGlobal } from '../../components/style/global';

const Signin = () => {
    const router = useRouter();
    const { me, logInLoading, logInDone } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (me && logInDone) {
            if (me.service !== '') {
                router.push('/home');
            } else {
                router.push('/welcome');
            }
        }
    }, [me, logInDone, router]);

    return (
        <>
            {logInLoading || logInDone ? (
                <Loading />
            ) : (
                <Layout title="WISE | SIGNIN">
                    <>
                        <AuthGlobal />
                        <CoverImg filter="true" />
                        <Modal>
                            <ModalTitle>로그인</ModalTitle>
                            <SigninForm />
                            <Link href="/user/signupAuth">
                                <ModalFooter>
                                    <button type="button">회원가입</button>
                                </ModalFooter>
                            </Link>
                        </Modal>
                    </>
                </Layout>
            )}
        </>
    );
};

export default Signin;
