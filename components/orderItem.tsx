/* eslint-disable camelcase */

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        IMP: any;
    }
}

type Response = {
    success: boolean;
    merchant_uid: string;
    error_msg: string;
};

const OrderItem = (): ReactElement => {
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
        const { success, merchant_uid, error_msg } = response;

        if (success) {
            alert(`결제 성공! 주문번호: ${merchant_uid}`);
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    };

    return (
        <Wrapper>
            <Title>
                <i className="material-icons">chevron_left</i>
                <h1>결제하기</h1>
            </Title>

            <h2>상세 정보</h2>
            <DetailBox>
                <Text>
                    <span>지역</span> 서울시 동작구
                </Text>
                <Text>
                    <span>날짜</span> 2021 - 05 - 14
                </Text>
                <Text>
                    <span>시간</span> 3시간
                </Text>
            </DetailBox>
            <Divide />
            <OrderButton onClick={handleClickPayment}>결제하기</OrderButton>
            <Link href="/">
                <CancelButton>취소하기</CancelButton>
            </Link>
        </Wrapper>
    );
};

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

const Text = styled.div`
    padding: 1rem 0 1rem 0.5rem;
    font-size: 1.1rem;
    font-weight: 500;
`;

const Divide = styled.div`
    border-top: 1px solid #ddd;
    margin-bottom: 3rem;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
`;

const DetailBox = styled.div`
    width: 28rem;
    margin-bottom: 2rem;
`;

const OrderButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    color: #fff;
    font-weight: 500;
    font-size: 1.4rem;
    background-color: #68d480;
    border-radius: 0.8rem;
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

const CancelButton = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    color: #aaa;
    background: #fff;
    font-size: 1.4rem;
    border: 1px solid #68d480;
    border-radius: 0.8rem;
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
