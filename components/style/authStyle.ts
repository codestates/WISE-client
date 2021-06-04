/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const CoverImg = styled.img.attrs({
    src: '/images/wise_bg.png',
})<{ filter?: string }>`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    filter: ${(props) => props.filter && 'brightness(80%)'};
    top: 0;
    z-index: -50;
    @media ${(props) => props.theme.mobile} {
        display: none;
    }
`;

export const Modal = styled.div`
    // border: 1px solid black;
    background: #ffffff;
    width: 30rem;
    border-radius: 30px;
    padding: 2rem 2rem 2rem 2rem;
    z-index: 500;
    margin: auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
    @media ${(props) => props.theme.mobile} {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0;
    }
`;

export const ModalTitle = styled.div`
    // border: 1px solid black;
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 30px;
`;

export const ModalFooter = styled.div`
    // border: 1px solid black;
    font-size: 12px;
    font-weight: 600;
    color: #cbcbcb;
    margin: 0px auto;
    button {
        border: none;
        background-color: #fff;
        font-size: 14px;
        font-weight: 600;
        color: #68d480;
        cursor: pointer;
        width: 70px;
    }
`;

export const Form = styled.form`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InputWrapper = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 388px;
    input {
        border: 1px solid #e5e5e5;
        height: 50px;
        padding: 0 1rem;
        border-radius: 10px;
        margin-top: 13px;
    }
    input:focus {
        outline: none;
    }
    margin-bottom: 21px;

    @media ${(props) => props.theme.mobile} {
        width: 60vw;
        align-self: center;
    }
`;

export const FormBtn = styled.button.attrs({
    type: 'submit',
})`
    border: none;
    width: 388px;
    height: 60px;
    background-color: #68d480;
    border-radius: 10px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    margin-bottom: 20px;
    &:focus {
        outline: none;
    }
    @media ${(props) => props.theme.mobile} {
        width: 60vw;
        align-self: center;
    }
`;

export const ErrorBox = styled.div`
    color: red;
    font-size: 12px;
    height: 14px;
    margin-top: 6px;
    padding-left: 8px;
    font-weight: 400;
`;
