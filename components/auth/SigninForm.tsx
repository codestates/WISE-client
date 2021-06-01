import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loginRequest } from '../../actions/user';
import { RootState } from '../../reducers';
import { ErrorBox, FormBtn, Form, InputWrapper } from '../style/authStyle';
import ErrorMessage from './ErrorMessage';
import Oauth from './Oauth';

const SigninForm = () => {
    const dispatch = useDispatch();
    const { logInError } = useSelector((state: RootState) => state.user);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [loginErrMsg, setLoginErrMsg] = useState(logInError);

    useEffect(() => {
        setLoginErrMsg(logInError);
    }, [logInError]);

    useEffect(() => {
        setLoginErrMsg('');
    }, []);

    const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(false);
    }, []);

    const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(false);
    }, []);

    const onsubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!email || !password) {
                if (!email) {
                    setEmailError(true);
                }
                if (!password) {
                    setPasswordError(true);
                }
                return;
            }
            dispatch(loginRequest('password', email, password));
        },
        [dispatch, email, password],
    );

    return (
        <>
            <Form onSubmit={onsubmit}>
                <InputWrapper>
                    <label htmlFor="user-email">이메일</label>
                    <input
                        name="user-email"
                        type="email"
                        placeholder="ex) user@mate.com"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <ErrorBox>{emailError && <ErrorMessage message="이메일을 입력해주세요." />}</ErrorBox>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="user-password">비밀번호</label>
                    <input
                        name="user-password"
                        type="password"
                        placeholder="********"
                        onChange={onChangePassword}
                        value={password}
                        minLength={6}
                    />
                    <ErrorBox>{passwordError && <ErrorMessage message="비밀번호를 입력해주세요." />}</ErrorBox>
                </InputWrapper>
                <FormBtn>로그인</FormBtn>
                <LoginErrMsg>{loginErrMsg || ''}</LoginErrMsg>
                <Oauth />
            </Form>
        </>
    );
};

const LoginErrMsg = styled.div`
    color: red;
    line-height: 2rem;
    height: 2rem;
`;

export default SigninForm;
