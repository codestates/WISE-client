/* eslint-disable react/display-name */
import moment from 'moment';
import { Table } from 'antd';
import Router from 'next/router';
import styled from 'styled-components';
import { Order } from '../../interfaces/data/order';

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

type PaymentDetailsProps = {
    title: string;
    orders: Order[];
};

const OrderTable = ({ title, orders }: PaymentDetailsProps) => {
    const dataSource = orders?.map((ele, idx) => ({
        key: idx,
        date: moment(ele.date).format('YYYY-MM-DD'),
        userName: ele.customer.name,
        location: ele.hospital,
        state: ele._id,
    }));
    const columns = [
        {
            title: '날짜',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '고객 이름',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '병원 위치',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: '상태',
            dataIndex: 'state',
            key: 'state',
            render: (orderId: string) => (
                <>
                    {orders[0].state === 'apply' && (
                        <ActionBtn
                            onClick={() => {
                                onClickApply(orderId);
                            }}
                        >
                            수락하기
                        </ActionBtn>
                    )}
                    {orders[0].state === 'accept' && <ActionBtn disabled>결제대기중</ActionBtn>}
                </>
            ),
        },
    ];

    const onClickApply = (orderId: string) => {
        Router.push(`/service/accept/${orderId}`);
    };

    return (
        <Wrapper>
            <Title>{title}</Title>
            <Table dataSource={dataSource} columns={columns} />
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

const ActionBtn = styled.button.attrs({
    type: 'button',
})`
    border: none;
    width: 5rem;
    height: 2rem;
    background-color: #68d480;
    border-radius: 10px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    &:disabled {
        background-color: #999;
        cursor: grab;
    }
`;

export default OrderTable;
