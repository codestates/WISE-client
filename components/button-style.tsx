/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

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
        padding: 4rem;
        align-self: center;
        border: 1px solid #f0f0f0;
        box-shadow: 0.3rem 0.1rem 0.4rem #f0f0f0;
        border-radius: 1rem;
        > .anticon {
            font-size: 5rem;
            text-align: center;
            margin: 0 0 2rem 35%;
            color: #db454c;
        }
    }
`;
