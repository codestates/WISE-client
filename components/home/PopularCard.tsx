/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
// import styled from 'styled-components';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

import { ShortService } from '../../interfaces/data/service';

type PopularCard = {
    service: ShortService;
    searchQuery?: { date: string; location: string; page: number; time: string };
};

const PopularCard = ({ service, searchQuery }: PopularCard) => (
    // console.log(searchQuery);

    // <Link
    //     href="/service/detail/[id]"
    //     as={
    //         searchQuery
    //             ? `/service/detail/${service._id}?date=${searchQuery.date}&time=${searchQuery.time}`
    //             : `/service/detail/${service._id}`
    //     }
    // >
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
        <SwiperSlide key={process.env.NEXT_PUBLIC_imageURL + service.images[0]}>
            <img
                src={process.env.NEXT_PUBLIC_imageURL + service.images[0]}
                alt="샘플이미지"
                style={{ objectFit: 'cover', height: '240px' }}
            />
            <div>
                <div style={{ fontSize: '1rem' }}>
                    {service.assistant.name} <span>{service.location}</span>
                </div>
                <div>{service.greetings}</div>
                <div style={{ fontWeight: 'bold' }}>{service.wage}원 / 시간</div>
            </div>
        </SwiperSlide>
    </Link>
);

export default PopularCard;
