import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { signUp } from '../../reducers/user';

const SignupForm = () => {
    const dispatch = useDispatch();
    const [role, onChangeRole] = useInput('customer');
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
            dispatch(signUp({ role, email, name, password, mobile }));
        },
        [role, email, password],
    );
    return (
        <>
            <FormWrapper onSubmit={onsubmit}>
                <TypeSelect>
                    <input onClick={onChangeRole} type="radio" id="user" name="type" value="customer" defaultChecked />
                    <label htmlFor="user">일반유저</label>
                    <input onClick={onChangeRole} type="radio" id="assistant" name="type" value="assistant" />
                    <label htmlFor="assistant">어시스턴트</label>
                </TypeSelect>
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

const TypeSelect = styled.div`
    margin: 1rem 0 1rem 0;
    input[type='radio'] {
        display: none;
    }
    input[type='radio'] + label {
        display: inline-block;
        width: 50%;
        height: 3rem;
        text-align: center;
        line-height: 3.125rem;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        border-radius: 0 15px 15px 0;
    }
    input[type='radio']:first-child + label {
        border-radius: 15px 0 0 15px;
    }
    input[type='radio']:checked + label {
        background-color: #68d480;
        color: #fff;
    }
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
