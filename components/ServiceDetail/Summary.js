import styled from 'styled-components';
import Link from 'next/link';
import { ActionButton } from '../button-style';

const Summary = () => (
    <Wrapper>
        <Bio>
            <h2>김천사 어시스턴트</h2>
            <h3>안전하고 편안하게 동행해드릴게요</h3>
        </Bio>
        <Info>
            <Text>
                <span>지역</span> 서울시 동작구
            </Text>
            <Text>
                <span>날짜</span> 2021 - 05 - 14
            </Text>
            <Text>
                <span>비용</span> <strong>17,000</strong>원 / 시간
            </Text>
            <h1>
                <span>총 비용</span> 51,000원
            </h1>
        </Info>
        <Link href="../reservation/id">
            <ActionButton>신청하기</ActionButton>
        </Link>
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2rem;
    height: 25rem;
    margin: 0 2%;
    width: 35%;
    span {
        color: #888;
        font-size: 0.9rem;
        margin-right: 1rem;
    }
    h1 {
        color: #222;
        font-weight: 700;
    }
`;

const Bio = styled.div`
    margin: 0 0 1rem 1rem;
    h2 {
        color: #222;
        font-weight: 700;
        margin: 0;
    }
    h3 {
        color: #555;
    }
`;

const Info = styled.div`
    margin-left: 1rem;
`;

const Text = styled.div`
    font-size: 1rem;
    font-weight: 500;
    padding-bottom: 1rem;
    color: #222;
`;

export default Summary;
