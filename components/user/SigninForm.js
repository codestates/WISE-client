import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { logIn } from '../../reducers/user';
import Oauth from './Oauth';

const SigninForm = () => {
    const { logInError } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [loginErrMsg, setLoginErrMsg] = useState(logInError);

    useEffect(() => {
        setLoginErrMsg(logInError);
    }, [logInError]);

    useEffect(() => {
        setLoginErrMsg('');
    }, []);

    const onsubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(logIn(email, password));
        },
        [email, password],
    );

    return (
        <>
            <FormWrapper onSubmit={onsubmit}>
                <InputWrapper>
                    <label htmlFor="user-email">이메일</label>
                    <input
                        name="user-email"
                        type="email"
                        placeholder="ex) user@mate.com"
                        required
                        value={email}
                        onChange={onChangeEmail}
                    />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="user-password">비밀번호</label>
                    <input
                        name="user-password"
                        type="password"
                        placeholder="********"
                        required
                        onChange={onChangePassword}
                        value={password}
                        minLength="6"
                    />
                </InputWrapper>
                <SigninBtn type="submit">로그인</SigninBtn>
                <LoginErrMsg>{loginErrMsg || ''}</LoginErrMsg>
                <Oauth />
            </FormWrapper>
        </>
    );
};

const LoginErrMsg = styled.div`
    color: red;
    line-height: 2rem;
    height: 2rem;
`;

const FormWrapper = styled.form`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const InputWrapper = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    input {
        width: 100%;
        border: 1px solid #e5e5e5;
        height: 3.125rem;
        margin: 0.8rem auto 0 auto;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
    input:focus {
        outline: none;
    }
    margin-bottom: 2.5rem;
`;

const SigninBtn = styled.button`
    border: none;
    font-weight: 600;
    height: 3rem;
    background-color: #68d480;
    color: white;
    border-radius: 0.5rem;
    margin: 0.625rem 0 0 0;
    cursor: pointer;
`;

export default SigninForm;
