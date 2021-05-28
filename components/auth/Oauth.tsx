import styled from 'styled-components';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { oauthLoginRequest } from '../../actions/user';

const Oauth = () => {
    const dispatch = useDispatch();
    const onGoogleClick = useCallback(() => {
        dispatch(oauthLoginRequest('google'));
    }, [dispatch]);
    const onFacebookClick = useCallback(() => {
        dispatch(oauthLoginRequest('facebook'));
    }, [dispatch]);
    return (
        <Wrapper>
            <SigninButton type="button" onClick={onGoogleClick}>
                <GoogleOutlined />
                oogle 계정으로 계속하기
            </SigninButton>
            <SigninButton type="button" onClick={onFacebookClick}>
                <FacebookOutlined />
                acebook 계정으로 계속하기
            </SigninButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SigninButton = styled.button`
    margin-left: -1rem;
    border-style: none;
    border: 1px solid #52a05a;
    border-radius: 1.5rem;
    height: 2.4rem;
    width: 23rem;
    background-color: #fff;
    color: #474747;
    cursor: pointer;
    &:hover {
        font-size: 0.9rem;
    }
    margin-bottom: 1rem;
`;

export default Oauth;
