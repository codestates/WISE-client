import { ReactElement } from 'react';
import styled from 'styled-components';

const OrderItem = (): ReactElement => (
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
        </DetailBox>
        <Divide />
        <h2>결제 정보</h2>
        <DetailBox>
            <Input placeholder="카드번호" type="text" />
            <Input placeholder="만료일" type="text" />
        </DetailBox>
        <Divide />
        <OrderButton>결제하기</OrderButton>
    </Wrapper>
);

const Wrapper = styled.div`
    padding: 0 3rem 3rem 0;
    margin-right: 2rem;
    div {
        padding: 1rem 0;
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
    padding: 1rem 0;
    font-size: 1.1rem;
    font-weight: 500;
`;

const Input = styled.input`
    border: 1px solid #ccc;
    border-radius: 0.4rem;
    margin: 0.5rem;
    padding-left: 1rem;
    width: 90%;
    height: 3.5rem;
    &:focus {
        outline: none;
    }
`;

const Divide = styled.div`
    border-top: 1px solid #ddd;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
`;

const DetailBox = styled.div`
    height: 10rem;
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
`;

export default OrderItem;
