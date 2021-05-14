import { ReactElement } from 'react';
import styled from 'styled-components';

const AssistantInfo = (): ReactElement => (
    <Wrapper>
        <h2>김천사 어시스턴트</h2>
        <img
            src="/images/sample_photo.jpeg"
            alt="샘플이미지"
            style={{ width: '14rem', height: '10rem', objectFit: 'cover', borderRadius: '0.2rem' }}
        />
        <h3>안전하고 편안하게 동행해드릴게요</h3>
        <Text>
            <span>지역</span> 서울시 동작구
        </Text>
        <Text>
            <span>날짜</span> 2021 - 05 - 14
        </Text>
        <Text>
            <span>비용</span> 17,000원 / 시간
        </Text>
        <h1>
            <span>총 비용</span> 51,000원
        </h1>
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: space-between;
    border: 1px solid #f0f0f0;
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.5rem 0.6rem #ddd;
    padding: 2rem 3rem;
    height: 40rem;
    margin: 0 2%;
    div,
    h3,
    img {
        padding-bottom: 1rem;
        font-weight: 600;
        color: #555;
    }
    span {
        color: #888;
        font-size: 1rem;
        margin-right: 1rem;
    }
    h1 {
        color: #4faa63;
        font-weight: 700;
    }
    h2 {
        color: #555;
        font-weight: 700;
        margin: 0;
    }
`;

const Text = styled.div`
    font-size: 1rem;
    font-weight: 500;
`;

export default AssistantInfo;
