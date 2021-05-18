import Link from 'next/link';
import styled from 'styled-components';
import { CancelButton, ActionButton } from './button-style';

const OrderItem = () => (
    <Wrapper>
        <Title>
            <Link href="../detail/id">
                <i className="material-icons">chevron_left</i>
            </Link>

            <h1>서비스 신청하기</h1>
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
        <ActionButton>신청하기</ActionButton>
        <Link href="/">
            <CancelButton>취소하기</CancelButton>
        </Link>
    </Wrapper>
);

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

export default OrderItem;
