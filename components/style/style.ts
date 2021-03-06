/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ProfileImagesWrapper = styled.div`
    display: flex;
    margin-bottom: 1.5rem;
`;

export const Image = styled.img`
    max-width: 22rem;
    max-height: 14rem;
`;

export const SubmitBtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
`;

export const ImagesWrapper = styled.div`
    // border: 1px solid gray;
    margin-left: 1.5rem;
    color: #777;
`;

export const DeleteBtn = styled.button`
    border: none;
    background: none;
    margin-left: 5px;
    cursor: pointer;
    font-size: 1rem;
`;

export const InputWrapper = styled.div`
    display: flex;
    & > span:first-child {
        width: 130px;
        margin-right: 1rem;
    }
    textarea,
    input {
        border: 1px solid #e5e5e5;
        // padding: 0.5rem;
        border-radius: 0.5rem;
        flex-grow: 1;
    }
    input[type='number'] {
        width: 8rem;
    }
    .shortInput {
        max-width: 10rem;
    }
    margin-bottom: 1.5rem;
    position: relative;
    .ant-checkbox-group {
        max-width: 600px;
        flex-grow: 1;
    }
`;

export const SubmitBtn = styled.button`
    border: none;
    font-weight: 600;
    height: 3rem;
    background-color: #68d480;
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 10rem;
`;

export const RegisterFormWrapper = styled.form`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
    @media ${(props) => props.theme.mobile} {
        padding: 0;
    }
`;

export const CancelButton = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    color: #aaa;
    background: #fff;
    font-size: 1.4rem;
    border: 1px solid #68d480;
    border-radius: 0.6rem;
    height: 2.8rem;
    width: 100%;
    box-shadow: 0.1rem 0.1rem 0.3rem #b8b8b8;
    cursor: pointer;
    transition: transform 200ms ease-in-out;
    &:hover {
        transform: scale(1.01);
        margin-left: -1%;
        box-shadow: 0.3rem 0.2rem 0.4rem #cecece;
        color: #aaa;
    }
    &:focus {
        outline: none;
    }
`;

export const ActionButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    color: #fff;
    font-weight: 500;
    font-size: 1.4rem;
    background-color: #68d480;
    border-radius: 0.6rem;
    height: 2.8rem;
    width: 100%;
    box-shadow: 0.1rem 0.1rem 0.3rem #b8b8b8;
    border: none;
    cursor: pointer;
    transition: transform 200ms ease-in-out;
    &:hover {
        transform: scale(1.01);
        margin-left: -1%;
        box-shadow: 0.3rem 0.2rem 0.4rem #b8b8b8;
    }
    &:focus {
        outline: none;
    }
`;

export const WarningBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 3rem;
    h2 {
        text-align: center;
        font-weight: 700;
    }
    a {
        align-self: center;
        /* border: 1px solid #f0f0f0; */
        /* box-shadow: 0.3rem 0.1rem 0.4rem #f0f0f0; */
        border-radius: 1rem;
        > .anticon {
            width: 100%;
            font-size: 5rem;
            margin-bottom: 1rem;
            justify-self: center;
            color: #db454c;
        }
    }
`;
