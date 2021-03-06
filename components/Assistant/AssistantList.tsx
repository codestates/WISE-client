import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import Router from 'next/router';
import { Order } from '../../interfaces/data/order';

import 'swiper/swiper-bundle.css';

// install Swiper modules
SwiperCore.use([Navigation]);

type AssistantListProps = {
    title: string;
    orders: Order[];
};

const AssistantList = ({ title, orders }: AssistantListProps) => {
    const onClickPayment = useCallback((orderId) => {
        Router.replace(`/payment/checkout/${orderId}`);
    }, []);

    const onClickReview = useCallback((orderId) => {
        Router.replace(`/review/${orderId}`);
    }, []);
    return (
        <>
            <Title>{title}</Title>
            <Wrapper>
                {orders?.length > 0 ? (
                    <Swiper
                        navigation
                        slidesPerView={1}
                        spaceBetween={20}
                        breakpoints={{
                            860: { slidesPerView: 2, spaceBetween: 20 },
                            1120: { slidesPerView: 3, spaceBetween: 20 },
                        }}
                    >
                        {orders
                            ?.sort((a, b) => {
                                if (a.state === 'accept') {
                                    return -1;
                                }
                                if (b.state === 'accept') {
                                    return 1;
                                }
                                return 0;
                            })
                            .map((ele: Order) => (
                                <SwiperSlide key={ele._id}>
                                    <Img
                                        src={process.env.NEXT_PUBLIC_imageURL + ele.service.images[0]}
                                        alt="샘플이미지"
                                    />
                                    <div>
                                        <div className="userName">{ele.assistant.name}</div>
                                        <div className="location">{ele.service.location}</div>
                                        {ele.state === 'apply' && <Btn disabled>수락 대기중</Btn>}
                                        {ele.state === 'accept' && (
                                            <Btn
                                                onClick={() => {
                                                    onClickPayment(ele._id);
                                                }}
                                            >
                                                결제하기
                                            </Btn>
                                        )}
                                        {ele.state === 'complete' &&
                                            (ele.isReviewed ? (
                                                <Btn disabled>후기 작성 완료</Btn>
                                            ) : (
                                                <Btn
                                                    onClick={() => {
                                                        onClickReview(ele._id);
                                                    }}
                                                >
                                                    후기 남기러가기
                                                </Btn>
                                            ))}
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                ) : (
                    <>
                        {title === '나의 주문 목록' && <EmptyMsg>생성된 주문이 없습니다.</EmptyMsg>}
                        {title === '매칭 완료된 어시스턴트 목록' && <EmptyMsg>매칭된 어시스턴트가 없습니다.</EmptyMsg>}
                    </>
                )}
            </Wrapper>
        </>
    );
};

const EmptyMsg = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
`;

const Img = styled.img`
    background-position: center center;
    object-fit: cover;
    overflow: hidden;
    height: 210px;
    width: 100%;
    border-radius: 3%;
    margin-bottom: 0.8rem;
    @media ${(props) => props.theme.mobile} {
        min-height: 15rem;
    }
`;

const Btn = styled.button`
    border: none;
    width: 100%;
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

const Wrapper = styled.div`
    width: 100%;
    height: 340px;

    .swiper-container {
        height: 100%;
    }

    .swiper-container .swiper-wrapper {
        width: 100%;
        margin: 0 auto;
    }
    .swiper-container .swiper-wrapper .swiper-slide {
        cursor: pointer;
        padding: 0;
    }
    .swiper-button-prev,
    .swiper-button-next {
        top: 35%;
        color: ${(props) => props.theme.mainColor};
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
        font-size: 1.6rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 100%;
        padding: 0.5rem 0.8rem;
    }
    @media ${(props) => props.theme.mobile} {
        height: 370px;
    }
`;

const Title = styled.div`
    // border: 1px solid black;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2rem;
`;

export default AssistantList;
