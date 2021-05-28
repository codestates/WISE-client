import { Table } from 'antd';
import styled from 'styled-components';
import { Order } from '../../interfaces/data/service';

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
        date: ele.date,
        userName: ele.customer.name,
        location: ele.hospital,
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
    ];
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

export default OrderTable;
