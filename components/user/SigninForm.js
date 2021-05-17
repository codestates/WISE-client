import styled from 'styled-components';

const SigninForm = () => {
    const onsubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    };
    return (
        <>
            <FormWrapper onSubmit={onsubmit}>
                <TypeSelect>
                    <input type="radio" id="user" name="type" />
                    <label htmlFor="user">일반유저</label>
                    <input type="radio" id="assistant" name="type" />
                    <label htmlFor="assistant">어시스턴트</label>
                </TypeSelect>
                <InputWrapper>
                    <label htmlFor="user-email">이메일</label>
                    <input name="user-email" type="email" placeholder="ex) user@mate.com" required />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="user-password">비밀번호</label>
                    <input name="user-password" type="password" placeholder="********" required />
                </InputWrapper>
                <SigninBtn type="submit">로그인</SigninBtn>
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
    margin: 2rem 0 3.125rem 0;
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
    height: 3.75rem;
    background-color: #68d480;
    color: white;
    border-radius: 0.5rem;
    margin: 0.625rem 0 1.25rem 0;
    cursor: pointer;
`;

export default SigninForm;
