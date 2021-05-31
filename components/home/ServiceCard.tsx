/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import Link from 'next/link';
import { ShortService } from '../../interfaces/data/service';

type ServiceCard = {
    service: ShortService;
    searchQuery?: { date: string; location: string; page: number; time: string };
};

const ServiceCard = ({ service, searchQuery }: ServiceCard) => (
    <Link
        href={{
            pathname: `/service/detail/${service._id}`,
            query: searchQuery
                ? {
                      date: searchQuery.date,
                      time: searchQuery.time,
                  }
                : {},
        }}
    >
        <Container>
            <ServiceImg src={process.env.NEXT_PUBLIC_imageURL + service.images[0]} alt="샘플이미지" />
            <div>
                <div style={{ fontSize: '1rem' }}>
                    {service.assistant.name} <span>{service.location}</span>
                </div>
                <div>{service.greetings}</div>
                <div style={{ fontWeight: 'bold' }}>{service.wage}원 / 시간</div>
            </div>
        </Container>
    </Link>
);
const ServiceImg = styled.img`
    // width: 280px;
    // height: 209px;
`;

const Container = styled.div`
    // border: 1px solid black;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 17rem;
    height: 18rem;
    margin-bottom: 2rem;
    span {
        color: #888;
        font-size: 0.5rem;
    }
    cursor: pointer;
`;

export default ServiceCard;
