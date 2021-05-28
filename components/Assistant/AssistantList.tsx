import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Order } from '../../interfaces/data/service';
import AssistantCard from './AssistantCard';

// {
//     _id: '1',
//     customer: {
//         _id: '2',
//         name: '박천사',
//         mobile: '1111',
//     },
//     assistant: {
//         _id: '3',
//         name: '김천사',
//         mobile: '1111',
//     },
//     service: {
//         _id: '4',
//         image: 'wise/1621842261940269.png',
//         location: '55',
//     },
//     pickup: '1',
//     hospital: '1',
//     content: '1',
//     message: '1',
//     date: '2020-05-05',
//     time: '1',
//     hours: 2,
//     totalPayment: 1000,
//     state: 'apply',
//     isReviewed: false,
// },

type AssistantListProps = {
    title: string;
    orders: Order[];
};

const AssistantList = ({ title, orders }: AssistantListProps) => {
    const slider = useRef<HTMLInputElement>(null);
    const [mainIndex, setMainIndex] = useState(0);
    const slideNext = () => {
        if (!slider.current) {
            return;
        }
        slider.current.style.transform = `translateX(-${(mainIndex + 1) * 272}px)`;
        setMainIndex(mainIndex + 1);
    };
    const slidePrev = () => {
        if (!slider.current) {
            return;
        }
        if (mainIndex > 0) {
            slider.current.style.transform = `translateX(-${(mainIndex - 1) * 272}px)`;
            setMainIndex(mainIndex - 1);
        }
    };
    return (
        <Wrapper>
            <Title>{title} 어시스턴트 목록</Title>
            <PrevBtn onClick={slidePrev}>&lang;</PrevBtn>
            <Container>
                {orders && (
                    <Slider ref={slider}>
                        {orders.map((ele: Order) => (
                            <AssistantCard key={ele._id} order={ele} />
                        ))}
                    </Slider>
                )}
            </Container>
            <NextBtn onClick={slideNext}>&rang;</NextBtn>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    max-width: 820px;
    position: relative;
`;

const Title = styled.div`
    // border: 1px solid black;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2rem;
`;

const Container = styled.div`
    // border: 1px solid black;
    display: flex;
    position: relative;
    max-width: 850px;
    height: 18rem;
    overflow: hidden;
    box-sizing: border-box;
`;

const Slider = styled.div`
    position: absolute;
    white-space: nowrap;
    display: flex;
    height: 14rem;
    transition: all 0.3s ease-in-out;
`;

const PrevBtn = styled.div`
    position: absolute;
    top: 9rem;
    left: -2rem;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 5;
`;

const NextBtn = styled.div`
    position: absolute;
    top: 9rem;
    right: -2rem;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 5;
`;

export default AssistantList;
