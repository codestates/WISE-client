import Link from 'next/link';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Order } from '../interfaces/data/service';
import { ActionButton } from './button-style';

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

export default OrderItem;
