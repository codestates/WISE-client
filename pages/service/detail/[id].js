// import { useCallback, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import { useEffect } from 'react';
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
import { loadMyInfo, LOG_IN_SUCCESS } from '../../../reducers/user';

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

    return (
        <>
            {service ? (
                <Layout>
                    <Global />
                    <Wrapper>
                        <Container>
                            <Detail>
                                <CoverImg src={`${IMAGE_URL}${service.images[0]}`} alt="cover images" />
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
const CoverImg = styled.img`
    width: 100%;
    height: 28rem;
    object-fit: cover;
    max-width: 50rem;
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
