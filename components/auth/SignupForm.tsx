import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupRequest } from '../../actions/user';
import { InputWrapper, Form, FormBtn, ErrorBox } from '../style/authStyle';
import ErrorMessage from './ErrorMessage';

const SignupForm = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState(false);

    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState(false);

    useEffect(() => {
        setEmail(localStorage.getItem('emailForSignup') as string);
    }, []);

    const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameError(false);
    }, []);

    const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(false);
    }, []);

    const onChangePasswordCheck = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setPasswordCheck(e.target.value);
            setPasswordCheckError(e.target.value !== password);
        },
        [password],
    );

    const onChangeMobile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMobile(e.target.value);
        setMobileError(false);
    }, []);

    const onsubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!name || !password || !passwordCheck || !mobile) {
                if (!name) {
                    setNameError(true);
                }
                if (!password) {
                    setPasswordError(true);
                }
                if (!passwordCheck) {
                    setPasswordCheckError(true);
                }
                if (!mobile) {
                    setMobileError(true);
                }
                return;
            }
            dispatch(signupRequest(email, name, password, mobile));
        },
        [dispatch, email, name, password, passwordCheck, mobile],
    );
    return (
        <>
            <Form onSubmit={onsubmit}>
                <InputWrapper>
                    <label htmlFor="name">??????</label>
                    <input name="name" type="text" placeholder="?????????" value={name} onChange={onChangeName} />
                    <ErrorBox>{nameError && <ErrorMessage message="????????? ??????????????????." />}</ErrorBox>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="email">?????????</label>
                    <input name="email" type="email" value={email} disabled />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="password">????????????</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <ErrorBox>{passwordError && <ErrorMessage message="??????????????? ??????????????????." />}</ErrorBox>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="passwordCheck">??????????????????</label>
                    <input
                        name="passwordCheck"
                        type="password"
                        placeholder="******"
                        value={passwordCheck}
                        onChange={onChangePasswordCheck}
                    />
                    <ErrorBox>
                        {passwordCheckError && <ErrorMessage message="??????????????? ???????????? ????????????." />}
                    </ErrorBox>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="mobile">?????????</label>
                    <input name="mobile" type="text" value={mobile} onChange={onChangeMobile} />
                    <ErrorBox>{mobileError && <ErrorMessage message="???????????? ??????????????????." />}</ErrorBox>
                </InputWrapper>
                <FormBtn>????????????</FormBtn>
            </Form>
        </>
    );
};

export default SignupForm;
