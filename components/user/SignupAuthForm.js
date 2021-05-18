import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { signUpAuth } from '../../reducers/user';

const SignupAuthForm = () => {
    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput('');

    const onsubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(signUpAuth({ email }));
        },
        [email],
    );
    return (
        <>
            <FormWrapper onSubmit={onsubmit}>
                {/* <TypeSelect>
                    <input onClick={onChangeRole} type="radio" id="user" name="type" defaultChecked />
                    <label htmlFor="user">일반유저</label>
                    <input onClick={onChangeRole} type="radio" id="assistant" name="type" />
                    <label htmlFor="assistant">어시스턴트</label>
                </TypeSelect> */}
                <InputWrapper>
                    <label htmlFor="user-email">이메일</label>
                    <input
                        name="user-email"
                        type="email"
                        placeholder="ex) user@mate.com"
                        value={email}
                        onChange={onChangeEmail}
                        required
                    />
                </InputWrapper>
                <SignupBtn type="submit">이메일인증</SignupBtn>
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

export default SignupAuthForm;
