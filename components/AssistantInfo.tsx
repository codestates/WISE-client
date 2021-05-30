import styled from 'styled-components';
import { Service } from '../interfaces/data/service';

type Props = {
    service: Service;
    hours: number;
};

const AssistantInfo = ({ service, hours }: Props) => {
    const IMAGE_URL = process.env.NEXT_PUBLIC_imageURL;

    return (
        <Wrapper>
            <h2>김천사 어시스턴트</h2>
            <img
                src={`${IMAGE_URL}${service.images[0]}`}
                alt="샘플이미지"
                style={{ height: '12rem', objectFit: 'cover', borderRadius: '0.2rem' }}
            />
            <h3>{service.greetings}</h3>
            <Text>
                <span>지역</span> {service.location}
            </Text>
            <Text>
                <span>날짜</span> 2021 - 05 - 14
            </Text>
            <Text>
                <span>시간</span> 오전
            </Text>
            <Text>
                <span>비용</span> {service.wage}원 / 시간
            </Text>
            <h1>
                <span>총 비용</span> {service.wage * hours}원
            </h1>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #f0f0f0;
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.5rem 0.6rem #ddd;
    padding: 2rem 3rem;
    height: 40rem;
    width: 25rem;
    margin: 7% 2%;
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
        color: #51be69;
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
