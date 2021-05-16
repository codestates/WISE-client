/* eslint-disable camelcase */
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
// import { useRouter } from 'next/router';
import styled from 'styled-components';
import queryString from 'query-string';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        IMP: any;
    }
}

export type Response = {
    success: boolean;
    merchant_uid: string;
    error_msg: string;
};

const Checkout = (): ReactElement => {
    // using redux
    // const { price } = useSelector((state) => state.user);

    // test
    const PRICE = 100;
    const PG = 'nice';
    const PAY_METHOD = 'card';
    const ORDER_NAME = '김천사 어시스턴트 동행 신청';
    const BUYER_NAME = '김가희';
    const BUYER_TEL = '01087659228';
    const BUYER_EMAIL = 'rkgml981105@gmail.com';

    const router = useRouter();

    const handleClickPayment = () => {
        // 1. 가맹점 식별
        const { IMP } = window;
        IMP.init('imp57278971');

        // 2. 결제 데이터 정의
        const data = {
            pg: PG, // PG사
            pay_method: PAY_METHOD, // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: PRICE, // 결제금액
            name: ORDER_NAME, // 주문명
            buyer_name: BUYER_NAME, // 구매자 이름
            buyer_tel: BUYER_TEL, // 구매자 전화번호
            buyer_email: BUYER_EMAIL, // 구매자 이메일
        };

        // 4. 결제 창 호출
        IMP.request_pay(data, handleCheckoutRequest);
    };

    // 3. 콜백 함수 정의
    const handleCheckoutRequest = (response: Response) => {
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
