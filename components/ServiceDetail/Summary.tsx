import styled from 'styled-components';
import Link from 'next/link';
import { ActionButton } from '../button-style';
import { ShortService } from '../../interfaces/data/service';

type ServiceProps = {
    service: ShortService;
    searchResult: { date: string; location: string; page: number; time: string };
};

const Summary = ({ service, searchResult }: ServiceProps) => (
    <Wrapper>
        <Bio>
            <h1>{service.assistant.name} 어시스턴트</h1>
            <h3>{service.greetings}</h3>
        </Bio>
        <Info>
            <Text>
                <span>지역</span> {service.location}
            </Text>
            <Text>
                <span>날짜</span> {searchResult.date}
            </Text>
            <Text>
                <span>시간</span> {searchResult.time}
            </Text>
            <Text>
                <span>평점</span>
                <i className="material-icons">star</i> {service.starRating ? service.starRating : 0}
            </Text>
            <Text>
                <span>비용</span> <strong>{service.wage}</strong>원 / 시간
            </Text>
        </Info>
        <Link href={`../reservation/${service._id}`}>
            <Button>신청하기</Button>
        </Link>
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2rem;
    height: 30rem;
    margin: 0 2%;
    width: 35%;
    border-radius: 0.4rem;
    box-shadow: 0.1rem 0 0.3rem #f6f6f6, -0.1rem 0 0.3rem #f6f6f6;
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
    i {
        color: #68d480;
        vertical-align: middle;
        margin-top: -0.4rem;
    }
`;

const Button = styled(ActionButton)`
    height: 3.4rem;
`;

export default Summary;
