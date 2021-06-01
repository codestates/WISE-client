/* eslint-disable consistent-return */
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import { RootState } from '../../reducers';
import { emailCheckRequest } from '../../actions/user';

import { ErrorBox, Form, FormBtn, InputWrapper } from '../style/authStyle';

const SignupAuthForm = () => {
    const dispatch = useDispatch();
    const { emailCheckError } = useSelector((state: RootState) => state.user);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailCheckErrorMsg, setEmailCheckErrorMsg] = useState('');

    useEffect(() => {
        setEmailCheckErrorMsg(emailCheckError);
    }, [emailCheckError]);

    useEffect(() => {
        setEmailCheckErrorMsg('');
    }, []);

    const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(false);
        setEmailCheckErrorMsg('');
    }, []);
    const onsubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!email) {
                return setEmailError(true);
            }
            dispatch(emailCheckRequest(email));
        },
        [dispatch, email],
    );
    return (
        <>
            <Form onSubmit={onsubmit}>
                <InputWrapper>
                    <label htmlFor="user-email">이메일을 입력해주세요</label>
                    <input
                        name="user-email"
                        type="email"
                        placeholder="ex) user@mate.com"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <ErrorBox>{emailError && <ErrorMessage message="이메일을 입력해주세요." />}</ErrorBox>
                </InputWrapper>
                <ErrMsg>{emailCheckErrorMsg || ''}</ErrMsg>
                <FormBtn>이메일인증</FormBtn>
            </Form>
        </>
    );
};

const ErrMsg = styled.div`
    color: red;
    line-height: 2rem;
    height: 2rem;
`;

export default SignupAuthForm;
