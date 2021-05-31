import { Table } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
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
    orders: Order[];
};

const PaymentDetails = ({ orders }: PaymentDetailsProps) => {
    const dataSource = orders?.map((ele, idx) => ({
        key: idx,
        orderName: `${ele.assistant.name}의 동행 서비스`,
        date: moment(ele.date).format('YYYY-MM-DD'),
        mobile: ele.assistant.mobile,
        totalPayment: ele.totalPayment,
    }));
    const columns = [
        {
            title: '주문명',
            dataIndex: 'orderName',
            key: 'orderName',
        },
        {
            title: '결제일',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '어시스턴트 연락처',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: '총 비용',
            dataIndex: 'totalPayment',
            key: 'totalPayment',
        },
    ];
    return (
        <Wrapper>
            <Title>현재 까지의 누적 결제 내역</Title>
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

export default PaymentDetails;
