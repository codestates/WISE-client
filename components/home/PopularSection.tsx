/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
// import Link from 'next/link';
import { ShortService } from '../../interfaces/data/service';
import { RootState } from '../../reducers';

import 'swiper/swiper-bundle.css';

// install Swiper modules
SwiperCore.use([Navigation]);

const PopularSection = () => {
    const { popularServices } = useSelector((state: RootState) => state.service);
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
                            <Img src={process.env.NEXT_PUBLIC_imageURL + ele.images[0]} alt="샘플이미지" />
                            <div>
                                <div>
                                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>{ele.assistant.name}</span>{' '}
                                    <span style={{ fontWeight: 200, fontSize: '0.9rem' }}>&nbsp;{ele.location}</span>
                                </div>
                                <div>{ele.greetings}</div>
                                <div style={{ fontWeight: 700 }}>{ele.wage}원 / 시간</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    margin-bottom: 5rem;
    width: 100%;
    height: 340px;

    .swiper-container {
        height: 100%;
    }

    .swiper-container .swiper-button-prev::after {
    }

    .swiper-container .swiper-button-next::after {
    }

    .swiper-container .swiper-wrapper {
        width: 100%;
        margin: 0 auto;
    }
    .swiper-container .swiper-wrapper .swiper-slide {
        cursor: pointer;
        padding: 0;
    }
    @media screen and ${(props) => props.theme.tablet} {
        height: 720px;
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
    @media screen and ${(props) => props.theme.tablet} {
        height: 85%;
    }
`;

const Header = styled.div`
    // border: 1px solid black;
    font-weight: bolder;
    font-size: 2rem;
    height: 2.5rem;
    margin-bottom: 2.7rem;
`;

export default PopularSection;
