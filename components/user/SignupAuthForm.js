/* eslint-disable consistent-return */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { emailCheckRequestAction } from '../../reducers/user';
import { InputWrapper, Form, FormBtn, ErrorBox } from './styles';
import ErrorMessage from './ErrorMessage';

const SignupAuthForm = () => {
    const dispatch = useDispatch();
    const { emailCheckError } = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailCheckErrorMsg, setEmailCheckErrorMsg] = useState('');

    useEffect(() => {
        setEmailCheckErrorMsg(emailCheckError);
    }, [emailCheckError]);

    useEffect(() => {
        setEmailCheckErrorMsg('');
    }, []);

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
        setEmailError(false);
        setEmailCheckErrorMsg('');
    }, []);
    const onsubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!email) {
                return setEmailError(true);
            }
            dispatch(emailCheckRequestAction(email));
        },
        [email],
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
