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

// TODO: 이미지 carousel 다시 확인
const SwiperContainer = ({ service }: Props) => {
    const IMAGE_URL = process.env.NEXT_PUBLIC_imageURL;

    return (
        <>
            <Wrapper>
                <Swiper navigation className="mySwiper">
                    {service.images.map((image: string) => (
                        <SwiperSlide style={{ textAlign: 'center' }} key={image}>
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
    max-width: 53vw;
    min-height: 30vh;
    img {
        object-fit: cover;
        height: 28rem;
    }
    @media ${(props) => props.theme.tablet} {
        max-width: 90vw;
        img {
            object-fit: cover;
            text-align: center;
            height: 25rem;
        }
    }

    @media ${(props) => props.theme.mobile} {
        max-width: 100%;
        margin-left: 0;
        max-height: 50vh;
        img {
            max-height: 50vh;
            width: 100%;
        }
    }
    .swiper-button-prev,
    .swiper-button-next {
        color: ${(props) => props.theme.mainColor};
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
        font-size: 2rem;
    }
`;

export default SwiperContainer;
