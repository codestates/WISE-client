/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import Router from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';
import { Order } from '../../interfaces/data/order';

type AssistantCard = {
    order: Order;
};

const AssistantCard = ({ order }: AssistantCard) => {
    const onClickPayment = useCallback(() => {
        Router.replace(`/payment/checkout/${order._id}`);
    }, [order]);

    const onClickReview = useCallback(() => {
        Router.replace(`/payment/checkout/${order._id}`);
    }, []);

    return (
        <Container>
            <ServiceImg src={process.env.NEXT_PUBLIC_imageURL + order.service.images[0]} alt="샘플이미지" />
            <div className="userName">{order.assistant.name}</div>
            <div className="location">{order.service.location}</div>
            {order.state === 'apply' && <Btn disabled>수락 대기중</Btn>}
            {order.state === 'accept' && <Btn onClick={onClickPayment}>결제하기</Btn>}
            {order.state === 'complete' &&
                (order.isReviewed ? (
                    <Btn disabled>후기 작성 완료</Btn>
                ) : (
                    <Btn onClick={onClickReview}>후기 남기러가기</Btn>
                ))}
        </Container>
    );
};

const Btn = styled.button`
    border: none;
    width: 254px;
    height: 55px;
    background-color: #68d480;
    border-radius: 5px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    &:disabled {
        cursor: grab;
        background-color: #d2d2d2;
    }
`;

const ServiceImg = styled.img`
    width: 254px;
    height: 171px;
    border-radius: 10px;
`;

const Container = styled.div`
    // border: 1px solid black;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 17rem;
    height: 18rem;
    margin-bottom: 2rem;
    .userName {
        font-size: 1rem;
    }
    .location {
        font-size: 14px;
        color: #707070;
    }
`;

export default AssistantCard;
