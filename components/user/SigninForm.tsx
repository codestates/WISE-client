import { Form, Input, Button, Radio } from 'antd';
import styled from 'styled-components';

const SigninForm = (): JSX.Element => (
    <>
        <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">일반 유저</Radio.Button>
            <Radio.Button value="b">어시스턴트</Radio.Button>
        </Radio.Group>
        <FormWrapper>
            <InputWrapper>
                <label htmlFor="user-email">이메일</label>
                <Input name="user-email" type="email" placeholder="ex) user@mate.com" required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-password">비밀번호</label>
                <Input name="user-password" type="password" placeholder="********" required />
            </InputWrapper>
            <Button htmlType="submit">로그인</Button>
        </FormWrapper>
    </>
);

const FormWrapper = styled(Form)`
    // border: 1px solid black;
    height: 75%;
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

export default SigninForm;
