/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import Link from 'next/link';
import { ShortService } from '../../interfaces/data/service';
import { RootState } from '../../reducers';
import 'swiper/swiper-bundle.css';

// install Swiper modules
SwiperCore.use([Navigation]);

const PopularSection = () => {
    const { popularServices, searchQuery } = useSelector((state: RootState) => state.service);
    return (
        <>
            <Header>인기있는 어시스턴트</Header>
            <Wrapper>
                <Swiper
                    navigation
                    slidesPerView={2}
                    spaceBetween={20}
                    breakpoints={{ 1024: { slidesPerView: 4, spaceBetween: 20 } }}
                >
                    {popularServices.map((ele: ShortService) => (
                        <SwiperSlide key={ele._id}>
                            <Link
                                href={{
                                    pathname: `/service/detail/${ele._id}`,
                                    query: searchQuery
                                        ? {
                                              date: searchQuery.date,
                                              time: searchQuery.time,
                                          }
                                        : {},
                                }}
                            >
                                <a>
                                    <Img src={process.env.NEXT_PUBLIC_imageURL + ele.images[0]} alt="샘플이미지" />
                                    <div>
                                        <div>
                                            <span style={{ fontWeight: 600, fontSize: '1rem' }}>
                                                {ele.assistant.name}
                                            </span>{' '}
                                            <span style={{ fontWeight: 200, fontSize: '0.9rem' }}>
                                                &nbsp;{ele.location}
                                            </span>
                                        </div>
                                        <div>{ele.greetings}</div>
                                        <div style={{ fontWeight: 700 }}>{ele.wage}원 / 시간</div>
                                    </div>
                                </a>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    margin-bottom: 5rem;
    width: 100%;
    height: 340px;

    .swiper-container {
        height: 100%;
    }

    .swiper-container .swiper-wrapper {
        width: 100%;
        margin: 0 auto;
    }
    .swiper-container .swiper-wrapper .swiper-slide {
        cursor: pointer;
        padding: 0;

        @media ${(props) => props.theme.tablet} {
            max-height: 50rem;
        }
        @media ${(props) => props.theme.mobile} {
            max-height: 15rem;
        }
    }
    .swiper-button-prev,
    .swiper-button-next {
        top: 35%;
        color: ${(props) => props.theme.mainColor};
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
        font-size: 2rem;
    }
`;
const Img = styled.img`
    background-position: center center;
    object-fit: cover;
    overflow: hidden;
    height: 210px;
    width: 100%;
    border-radius: 3%;
    margin-bottom: 30px;
    @media screen and (max-width: 1023px) {
        max-height: 40rem;
        height: 250px;
    }
    @media ${(props) => props.theme.mobile} {
        height: 200px;
    }
`;

const Header = styled.div`
    font-weight: bolder;
    font-size: 1.4rem;
    height: 2.5rem;
    margin-bottom: 2rem;
`;

export default PopularSection;
