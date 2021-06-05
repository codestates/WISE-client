import Link from 'next/link';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import React from 'react';
import { CancelButton } from '../style/style';
import { Order } from '../../interfaces/data/order';

type Props = {
    reservationInfo: Order;
};

const CheckoutNoSSR = dynamic(() => import('./Checkout'), { ssr: false });

const OrderItem = ({ reservationInfo }: Props) => (
    <Wrapper>
        <Divide />
        <CheckoutNoSSR order={reservationInfo} />
        <Link href="/">
            <CancelButton>나중에 하기</CancelButton>
        </Link>
    </Wrapper>
);

const Wrapper = styled.div`
    width: 100%;
    align-self: center;
    div {
        color: #333;
    }
    span {
        color: #888;
        font-size: 1rem;
        margin-right: 1rem;
    }
    h1,
    h2 {
        margin: 0.5rem;
        font-weight: 600;
    }
    i {
        font-size: 2rem;
        cursor: pointer;
    }

    @media ${(props) => props.theme.tablet} {
        width: 60vw;
    }

    @media ${(props) => props.theme.mobile} {
        width: 80vw;
    }
`;

const Divide = styled.div`
    border-top: 1px solid #ddd;
    margin-bottom: 3rem;

    @media ${(props) => props.theme.tablet} {
        margin-bottom: 2rem;
    }
`;

export default OrderItem;
