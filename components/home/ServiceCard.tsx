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
            {service.images === undefined ? (
                <ServiceImg src="/images/avatar_default.png" style={{ width: '100px', height: '100px' }} />
            ) : (
                <ServiceImg src={process.env.NEXT_PUBLIC_imageURL + service.images[0]} alt="샘플이미지" />
            )}
            <div>
                <div>
                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>{service.assistant.name}</span>{' '}
                    <span style={{ fontWeight: 200, fontSize: '0.9rem' }}>&nbsp;{service.location}</span>
                </div>
                <div>{service.greetings}</div>
                <div style={{ fontWeight: 700 }}>{service.wage}원 / 시간</div>
            </div>
        </Container>
    </Link>
);
const ServiceImg = styled.img`
    background-color: cover;
    background-position: center center;
    object-fit: cover;
    overflow: hidden;
    height: 63%;
    border-radius: 3%;
    margin-bottom: 30px;
    @media screen and ${(props) => props.theme.tablet} {
        height: 90%;
    }
`;

const Container = styled.div`
    // border: 1px solid yellow;
    height: 340px;
    display: flex;
    flex-direction: column;
    min-width: 100%;
    margin-bottom: 2rem;
    cursor: pointer;
    @media screen and ${(props) => props.theme.tablet} {
        height: 420px;
    }
`;

export default ServiceCard;
