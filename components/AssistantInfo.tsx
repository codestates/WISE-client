import styled from 'styled-components';
import { Service } from '../interfaces/data/service';

type Props = {
    service: Service;
    hours: number;
    date: string | string[];
    time: string | string[];
};

const AssistantInfo = ({ service, hours, date, time }: Props) => {
    const IMAGE_URL = process.env.NEXT_PUBLIC_imageURL;

    return (
        <Wrapper>
            <h2>{service.assistant.name} 어시스턴트</h2>
            {service.images ? (
                <img
                    src={`${IMAGE_URL}${service.images[0]}`}
                    alt="샘플이미지"
                    style={{ height: '12rem', objectFit: 'contain', borderRadius: '0.2rem' }}
                />
            ) : (
                <img
                    src="images/avatar_default.png"
                    alt="샘플이미지"
                    style={{ height: '12rem', objectFit: 'cover', borderRadius: '0.2rem' }}
                />
            )}

            <h3>{service.greetings}</h3>
            <Text>
                <span>지역</span> {service.location}
            </Text>
            <Text>
                <span>날짜</span> {date === 'undefined' ? '날짜를 확인하세요' : date}
            </Text>
            <Text>
                <span>시간</span> {time === 'undefined' ? '시간을 확인하세요' : time}
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
    width: 25rem;
    height: 40rem;
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
        text-decoration: 3px #51be69 underline;
        text-underline-position: under;
        font-weight: 700;
        margin: 0;
    }

    @media ${(props) => props.theme.tablet} {
        order: -1;
        width: 60vw;
        margin: 6rem auto;

        img {
            height: 16rem !important;
        }

        h1,
        h2,
        h3 {
            text-align: center;
        }

        h2 {
            margin-bottom: 1rem;
        }
    }

    @media ${(props) => props.theme.mobile} {
        h1,
        h2,
        h3 {
            text-align: left;
            margin: 0;
        }
        border: none;
        border-radius: 0;
        width: 100%;
        border-bottom: 1px solid #ddd;
        box-shadow: none;
        padding: 0;
    }
`;

const Text = styled.div`
    font-size: 1rem;
    font-weight: 500;

    @media ${(props) => props.theme.tablet} {
        text-align: center;
    }

    @media ${(props) => props.theme.mobile} {
        text-align: left;
    }
`;

export default AssistantInfo;
