import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { emailCheck } from '../../reducers/user';

const SignupAuthForm = () => {
    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput('');
    const { emailCheckError } = useSelector((state) => state.user);
    const onsubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(emailCheck(email));
        },
        [email],
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
                        value={email}
                        onChange={onChangeEmail}
                        required
                    />
                </InputWrapper>
                <ErrMsg>{emailCheckError || ''}</ErrMsg>
                <SignupBtn type="submit">이메일인증</SignupBtn>
            </FormWrapper>
        </>
    );
};

const ErrMsg = styled.div`
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
