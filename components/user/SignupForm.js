import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { signupRequestAction } from '../../reducers/user';

const SignupForm = () => {
    const dispatch = useDispatch();
    const [name, onChangeName] = useInput('');
    const [email, setEmail] = useState('');
    const [password, onChangePassword] = useInput('');
    const [mobile, onChangeMobile] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        setEmail(localStorage.getItem('emailForSignup'));
    }, []);

    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== password);
        },
        [password],
    );
    const onsubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(signupRequestAction(email, name, password, mobile));
        },
        [email, name, password, mobile],
    );
    return (
        <>
            <FormWrapper onSubmit={onsubmit}>
                <InputWrapper>
                    <label htmlFor="user-name">이름</label>
                    <input
                        name="user-name"
                        type="text"
                        placeholder="홍길동"
                        value={name}
                        onChange={onChangeName}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="user-email">이메일</label>
                    <input name="user-email" type="email" value={email} disabled />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="user-password">비밀번호</label>
                    <input
                        name="user-password"
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={onChangePassword}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="user-passwordCheck">비밀번호확인</label>
                    <input
                        name="user-passwordCheck"
                        type="password"
                        placeholder="******"
                        value={passwordCheck}
                        onChange={onChangePasswordCheck}
                        required
                    />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="user-phonenumber">연락처</label>
                    <input name="user-phonenumber" type="text" value={mobile} onChange={onChangeMobile} required />
                </InputWrapper>
                <SignupBtn type="submit">가입하기</SignupBtn>
            </FormWrapper>
        </>
    );
};

const ErrorMessage = styled.div`
    color: red;
    font-size: 0.8rem;
    position: absolute;
    top: 5rem;
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
        margin: 0.5rem auto 0 auto;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
    input:focus {
        outline: none;
    }
    margin-bottom: 1.5rem;
    position: relative;
`;

const SignupBtn = styled.button`
    border: none;
    font-weight: 600;
    height: 3rem;
    background-color: #68d480;
    color: white;
    border-radius: 0.5rem;
    margin: 0.625rem 0 1.25rem 0;
    cursor: pointer;
`;

export default SignupForm;
