import Link from 'next/link';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Order } from '../interfaces/data/service';

type Props = {
    reservationInfo: Order;
};

const CheckoutNoSSR = dynamic(() => import('./Checkout'), { ssr: false });

const OrderItem = ({ reservationInfo }: Props) => (
    <Wrapper>
        <Divide />
        <CheckoutNoSSR order={reservationInfo} />
        <Link href="/">
            <ActionButton>취소하기</ActionButton>
        </Link>
    </Wrapper>
);

const Wrapper = styled.div`
    padding: 0 3rem 3rem 0;
    margin-right: 2rem;
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
`;

const Divide = styled.div`
    border-top: 1px solid #ddd;
    margin-bottom: 3rem;
`;

export const ActionButton = styled.a`
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

export default OrderItem;
