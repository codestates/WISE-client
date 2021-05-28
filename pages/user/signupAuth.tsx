import Link from 'next/link';
import { useSelector } from 'react-redux';
import Layout from '../../layout/Layout';
import SignupAuthForm from '../../components/auth/SignupAuthForm';
import { AuthGlobal, CoverImg, Modal, ModalTitle, ModalFooter } from '../../components/auth/styles';
import { RootState } from '../../reducers';

const SignupAuth = () => {
    const { emailCheckDone } = useSelector((state: RootState) => state.user);

    return (
        <Layout title="WISE | SIGNUP">
            <>
                <AuthGlobal />
                <CoverImg filter="true" />
                <Modal>
                    <ModalTitle>회원가입</ModalTitle>
                    {emailCheckDone ? (
                        <div>이메일을 확인해주세요 :)</div>
                    ) : (
                        <>
                            <SignupAuthForm />
                            <Link href="/user/signin">
                                <ModalFooter>
                                    이미 계정이 있으신가요?&nbsp;&nbsp;
                                    <button type="button">로그인</button>
                                </ModalFooter>
                            </Link>
                        </>
                    )}
                </Modal>
            </>
        </Layout>
    );
};

export default SignupAuth;
