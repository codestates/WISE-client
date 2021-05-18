import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { logIn } from '../../reducers/user';
import Oauth from './Oauth';

const SigninForm = () => {
    const dispatch = useDispatch();
    const [role, setRole] = useState('customer');
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onChangeRole = useCallback((e) => {
        setRole(e.target.value);
    }, []);
    const onsubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(logIn({ role, email, password }));
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
                <Oauth role={role} />
            </FormWrapper>
        </>
    );
};

const FormWrapper = styled.form`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const TypeSelect = styled.div`
    margin: 1rem 0 1.125rem 0;
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
    margin: 0.625rem 0 1.25rem 0;
    cursor: pointer;
`;

export default SigninForm;
