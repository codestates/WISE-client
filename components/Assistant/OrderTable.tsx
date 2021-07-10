/* eslint-disable react/display-name */
import moment from 'moment';
import { Table } from 'antd';
import Router from 'next/router';
import styled from 'styled-components';
import { Order } from '../../interfaces/data/order';

type PaymentDetailsProps = {
    title: string;
    orders: Order[];
};

const OrderTable = ({ title, orders }: PaymentDetailsProps) => {
    const dataSource = orders?.map((ele, idx) => ({
        key: idx,
        date: moment(ele.date).format('YYYY-MM-DD'),
        userName: ele.customer.name,
        content: ele.content,
        time: ele.time,
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
            title: '요청사항',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '시간',
            dataIndex: 'time',
            key: 'time',
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
                            자세히 보기
                        </ActionBtn>
                    )}
                    {orders[0].state === 'accept' && <ActionBtn disabled>결제대기중</ActionBtn>}
                    {orders[0].state === 'complete' && <ActionBtn disabled>매칭완료</ActionBtn>}
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
    max-width: 820px;
    position: relative;
    .ant-table-cell {
        padding: 0.5rem;
    }
`;

const Title = styled.div`
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
