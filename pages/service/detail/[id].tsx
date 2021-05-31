import styled, { createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import axios from 'axios';
import Navigation from '../../../components/ServiceDetail/Navigation';
import Summary from '../../../components/ServiceDetail/Summary';
import Description from '../../../components/ServiceDetail/Description';
import ReviewComponent from '../../../components/ServiceDetail/Review';
import Loading from '../../../components/Loading';
import FAQ from '../../../components/ServiceDetail/FAQ';
import Refund from '../../../components/ServiceDetail/Refund';
import wrapper from '../../../store/configureStore';
import { RootState } from '../../../reducers';
import Layout from '../../../layout/Layout';
import Swiper from '../../../components/ServiceDetail/Swiper';
import { loadServiceSchedule, LOAD_SERVICE_INFO_REQUEST } from '../../../actions/service';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
    .Summary__Wrapper-sc-1xkyrag-0, .Navigation__Wrapper-fz5fkk-0{
      position: sticky;
      top: 5%;
    }
    .Navigation__Wrapper-fz5fkk-0 {
        top: 0;
    }

`;

const ServiceDetail = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    // const { id } = router.query;
    // console.log(id);
    // TODO: search result가 한번에 안받아와지고 새로고침해야지만 받아와지는 문제
    const searchResult = router.query;
    console.log(searchResult);
    // TODO: review import
    const { service } = useSelector((state: RootState) => state.service);

    useEffect(() => {
        if (typeof router.query.id === 'string') {
            axios.get(`http://localhost:5000/api/v1/services/schedule?serviceId=${router.query.id}`).then((result) => {
                dispatch(loadServiceSchedule(result.data));
            });
        }
    }, [dispatch, router]);

    return (
        <>
            {service ? (
                <Layout title="Service Detail">
                    <>
                        <Global />
                        <Wrapper>
                            <Container>
                                <Detail>
                                    <Swiper service={service} />
                                    <Navigation _id={service._id} />
                                    <Description service={service} />
                                    {/* <ReviewComponent review={review} /> */}
                                    <ReviewComponent />
                                    <FAQ />
                                    <Refund />
                                </Detail>
                                <Summary service={service} searchResult={searchResult} />
                            </Container>
                        </Wrapper>
                    </>
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
    context.store.dispatch({
        type: LOAD_SERVICE_INFO_REQUEST,
        serviceId: context.params?.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default ServiceDetail;
