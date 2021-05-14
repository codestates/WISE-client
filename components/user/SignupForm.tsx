import { Form, Input, Button, Radio } from 'antd';
import styled from 'styled-components';

const SignupForm = (): JSX.Element => (
    <>
        <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">일반 유저</Radio.Button>
            <Radio.Button value="b">어시스턴트</Radio.Button>
        </Radio.Group>
        <FormWrapper>
            <InputWrapper>
                <label htmlFor="user-name">이름</label>
                <Input name="user-name" type="text" placeholder="홍길동" required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-email">이메일</label>
                <Input name="user-email" type="email" placeholder="ex) user@mate.com" required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-password">비밀번호</label>
                <Input name="user-password" type="password" placeholder="********" required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-passwordCheck">비밀번호확인</label>
                <Input name="user-passwordCheck" type="password" placeholder="********" required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-phonenumber">연락처</label>
                <Input name="user-phonenumber" type="text" placeholder="********" required />
            </InputWrapper>
            <Button htmlType="submit">가입하기</Button>
        </FormWrapper>
    </>
);

const FormWrapper = styled(Form)`
    // border: 1px solid black;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    button {
        font-weight: 600;
        width: 100%;
        height: 50px;
        background-color: #72cd87;
        color: white;
        border-radius: 0.5rem;
    }
`;

const InputWrapper = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    input {
        height: 2.5rem;
        margin: 1rem auto 0 auto;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
`;

export default SignupForm;
