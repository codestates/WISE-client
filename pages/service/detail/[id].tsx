// import { useCallback, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../../components/Layout';
import Navigation from '../../../components/ServiceDetail/Navigation';
import Summary from '../../../components/ServiceDetail/Summary';
import Description from '../../../components/ServiceDetail/Description';
import Review from '../../../components/ServiceDetail/Review';
import { GET_SERVICE_INFO_REQUEST } from '../../../reducers/service';
import Loading from '../../../components/Loading';
import FAQ from '../../../components/ServiceDetail/FAQ';
import Refund from '../../../components/ServiceDetail/Refund';
import wrapper from '../../../store/configureStore';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
    .Summary__Wrapper-sc-1wbecrp-0, .Navigation__Wrapper-sc-1jd4ncw-0{
      position: sticky;
      top: 0;
      z-index: 10;
    }

`;

const ServiceDetail = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch({
                type: LOG_IN_SUCCESS,
            });
            dispatch(loadMyInfo());
        }
    }, []);

    const IMAGE_URL = process.env.NEXT_PUBLIC_imageURL;
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const { service, review } = useSelector((state) => state.service);

    // carousel
    const slider = useRef();
    const container = useRef();
    const [mainIndex, setMainIndex] = useState(0);
    const slideNext = () => {
        slider.current.style.transform = `translateX(-${(mainIndex + 1) * 50}rem)`;
        setMainIndex(mainIndex + 1);
    };
    const slidePrev = () => {
        if (mainIndex > 0) {
            slider.current.style.transform = `translateX(-${(mainIndex - 1) * 50}rem)`;
            setMainIndex(mainIndex - 1);
        }
    };
    return (
        <>
            {service ? (
                <Layout>
                    <Global />
                    <Wrapper>
                        <Container>
                            <Detail>
                                <CarouselCon ref={container}>
                                    <PrevBtn onClick={slidePrev}>&lang;</PrevBtn>
                                    <Slider ref={slider}>
                                        {service.images.map((image) => (
                                            <img
                                                src={`${IMAGE_URL}${service.images[0]}`}
                                                alt="cover images"
                                                key={image}
                                            />
                                        ))}
                                    </Slider>
                                    <NextBtn onClick={slideNext}>&rang;</NextBtn>
                                </CarouselCon>
                                <Navigation id={id} />
                                <Description service={service} />
                                <Review review={review} />
                                <FAQ />
                                <Refund />
                            </Detail>
                            <Summary service={service} id={id} />
                        </Container>
                    </Wrapper>
                </Layout>
            ) : (
                <Loading />
            )}
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
    margin-bottom: 6rem;
`;
const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const Detail = styled.div`
    flex: 6 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CarouselCon = styled.div`
    display: flex;
    width: 100%;
`;

const Slider = styled.div`
    display: flex;
    justify-content: center;
    max-width: 50rem;
    transition: all 0.3s ease-in-out;
    img {
        width: 90%;
        object-fit: cover;
        height: 28rem;
    }
`;

const PrevBtn = styled.div`
    position: relative;
    top: 13rem;
    left: 0;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 5;
`;

const NextBtn = styled.div`
    position: relative;
    top: 13rem;
    right: 0;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 5;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    context.store.dispatch({
        type: GET_SERVICE_INFO_REQUEST,
        serviceId: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default ServiceDetail;