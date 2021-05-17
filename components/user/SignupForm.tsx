import styled from 'styled-components';

const SignupForm = (): JSX.Element => (
    <>
        <FormWrapper>
            <TypeSelect>
                <input type="radio" id="user" name="type" />
                <label htmlFor="user">일반유저</label>
                <input type="radio" id="assistant" name="type" />
                <label htmlFor="assistant">어시스턴트</label>
            </TypeSelect>
            <InputWrapper>
                <label htmlFor="user-name">이름</label>
                <input name="user-name" type="text" placeholder="홍길동" required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-email">이메일</label>
                <input name="user-email" type="email" placeholder="ex) user@mate.com" required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-password">비밀번호</label>
                <input name="user-password" type="password" placeholder="********" required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-passwordCheck">비밀번호확인</label>
                <input name="user-passwordCheck" type="password" placeholder="********" required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-phonenumber">연락처</label>
                <input name="user-phonenumber" type="text" placeholder="********" required />
            </InputWrapper>
            <SignupBtn type="submit">가입하기</SignupBtn>
        </FormWrapper>
    </>
);

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
