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
`;
