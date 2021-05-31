// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper/core';
import styled from 'styled-components';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import { Service } from '../../interfaces/data/service';

// install Swiper modules
SwiperCore.use([Navigation]);

type Props = {
    service: Service;
};
const SwiperContainer = ({ service }: Props) => {
    const IMAGE_URL = process.env.NEXT_PUBLIC_imageURL;

    return (
        <>
            <Wrapper>
                <Swiper navigation className="mySwiper">
                    {service.images.map((image: string) => (
                        <SwiperSlide key={image}>
                            <img src={`${IMAGE_URL}${image}`} alt="cover images" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    margin-left: 5%;
    /* width: 90%; */
    max-width: 53vw;
    min-height: 30vh;
    /* .mySwiper {
        max-width: 50vw;
        min-height: 30vh;
    } */
    img {
        object-fit: cover;
        height: 28rem;
    }
`;

export default SwiperContainer;
