import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupRequestAction } from '../../reducers/user';
import { InputWrapper, Form, FormBtn, ErrorBox } from './styles';
import ErrorMessage from './ErrorMessage';

const SignupForm = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState(false);

    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState(false);

    useEffect(() => {
        setEmail(localStorage.getItem('emailForSignup'));
    }, []);

    const onChangeName = useCallback((e) => {
        setName(e.target.value);
        setNameError(false);
    });

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
        setPasswordError(false);
    });

    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordCheckError(e.target.value !== password);
        },
        [password],
    );

    const onChangeMobile = useCallback((e) => {
        setMobile(e.target.value);
        setMobileError(false);
    });

    const onsubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!name || !password || !passwordCheck || !mobile) {
                if (!name) {
                    setNameError(true);
                }
                if (!password) {
                    setPasswordError(true);
                }
                if (!passwordCheck) {
                    setPasswordCheckError(true);
                }
                if (!mobile) {
                    setMobileError(true);
                }
                return;
            }
            dispatch(signupRequestAction(email, name, password, mobile));
        },
        [email, name, password, mobile],
    );
    return (
        <>
            <Form onSubmit={onsubmit}>
                <InputWrapper>
                    <label htmlFor="name">이름</label>
                    <input name="name" type="text" placeholder="홍길동" value={name} onChange={onChangeName} />
                    <ErrorBox>{nameError && <ErrorMessage message="이름을 입력해주세요." />}</ErrorBox>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="email">이메일</label>
                    <input name="email" type="email" value={email} disabled />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <ErrorBox>{passwordError && <ErrorMessage message="비밀번호를 입력해주세요." />}</ErrorBox>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="passwordCheck">비밀번호확인</label>
                    <input
                        name="passwordCheck"
                        type="password"
                        placeholder="******"
                        value={passwordCheck}
                        onChange={onChangePasswordCheck}
                    />
                    <ErrorBox>
                        {passwordCheckError && <ErrorMessage message="비밀번호가 일치하지 않습니다." />}
                    </ErrorBox>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="mobile">연락처</label>
                    <input name="mobile" type="text" value={mobile} onChange={onChangeMobile} />
                    <ErrorBox>{mobileError && <ErrorMessage message="연락처를 입력해주세요." />}</ErrorBox>
                </InputWrapper>
                <FormBtn>가입하기</FormBtn>
            </Form>
        </>
    );
};

export default SignupForm;
