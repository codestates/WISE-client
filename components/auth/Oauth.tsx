import styled from 'styled-components';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginRequest } from '../../actions/user';

const Oauth = () => {
    const dispatch = useDispatch();
    const OauthLogin = useCallback(
        (e) => {
            dispatch(loginRequest(e.target.name));
        },
        [dispatch],
    );
    return (
        <Wrapper>
            <SigninButton name="google" type="button" onClick={OauthLogin}>
                <span className="google">
                    <GoogleOutlined />
                    <span>o</span>
                    <span>o</span>
                    <span>g</span>
                    <span>l</span>
                    <span>e</span>
                </span>
                계정으로 계속하기
            </SigninButton>
            <SigninButton name="facebook" type="button" onClick={OauthLogin}>
                <span className="facebook">
                    <FacebookOutlined />
                    acebook
                </span>
                계정으로 계속하기
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
    border-style: none;
    border: 1px solid #52a05a;
    border-radius: 1.5rem;
    height: 2.4rem;
    width: 388px;
    background-color: #fff;
    color: #474747;
    cursor: pointer;
    &:hover {
        font-size: 0.9rem;
    }
    margin-bottom: 1rem;
    @media ${(props) => props.theme.mobile} {
        width: 60vw;
        align-self: center;
    }
    .facebook {
        color: #3b5998;
    }
    .google {
        & > span:nth-child(1),
        & > span:nth-child(4) {
            color: #4285f4;
        }
        & > span:nth-child(2),
        & > span:nth-child(6) {
            color: #ea4335;
        }
        & > span:nth-child(3) {
            color: #fbbc05;
        }
        & > span:nth-child(5) {
            color: #34a853;
        }
    }
`;

export default Oauth;
