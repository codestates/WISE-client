import { Table } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { Order } from '../../interfaces/data/order';

type PaymentDetailsProps = {
    orders: Order[];
};

const PaymentDetails = ({ orders }: PaymentDetailsProps) => {
    const dataSource = orders?.map((ele, idx) => ({
        key: idx,
        orderId: ele._id,
        orderName: `${ele.assistant.name}의 동행 서비스`,
        date: moment(ele.date).format('YYYY-MM-DD'),
        mobile: ele.assistant.mobile,
        totalPayment: ele.totalPayment,
    }));
    const columns = [
        {
            title: '주문번호',
            dataIndex: 'orderId',
            key: 'orderId',
            ellipsis: true,
        },
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
