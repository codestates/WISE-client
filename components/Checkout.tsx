/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRouter } from 'next/router';
import styled from 'styled-components';
import queryString from 'query-string';
import { RequestPayResponse } from 'iamport-typings';
import { Order } from '../interfaces/data/service';

type Props = {
    order: Order;
};

const Checkout = ({ order }: Props) => {
    const router = useRouter();

    const IMP_CODE: string = process.env.NEXT_PUBLIC_IMPcode!;
    const BUYER_TEL = '010-8765-9228';
    // const BUYER_EMAIL = 'rkgml981105@gmail.com';

    const handleClickPayment = () => {
        // 1. 가맹점 식별
        const { IMP } = window;
        IMP?.init(IMP_CODE);

        // 2. 결제 데이터 정의
        const data = {
            pg: 'nice', // PG사
            pay_method: 'card', // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: order.totalPayment, // 결제금액
            name: `${order.assistant.name} 어시스턴트의 동행 서비스`, // 주문명
            buyer_name: order.customer.name, // 구매자 이름
            // buyer_tel: order.customer.mobile, // 구매자 전화번호
            buyer_tel: BUYER_TEL,
        };

        // 4. 결제 창 호출
        // eslint-disable-next-line no-use-before-define
        IMP?.request_pay(data, handleCheckoutRequest);
    };

    // 3. 콜백 함수 정의
    const handleCheckoutRequest = (response: RequestPayResponse) => {
        const query = queryString.stringify(response);
        router.push(`/payment/result?${query}`);
    };

    return <ActionButton onClick={handleClickPayment}>결제하기</ActionButton>;
};

const ActionButton = styled.button`
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

export default Checkout;
