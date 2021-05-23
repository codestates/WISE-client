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
        width: 8rem;
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
    textarea:focus,
    input:focus {
        outline: none;
    }
    margin-bottom: 1.5rem;
    position: relative;
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
    // border: 1px solid black;
    margin-top: 1rem;
    display:flex
    padding: 0 3rem;
`;
