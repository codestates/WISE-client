/* eslint-disable import/namespace */
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import nookies from 'nookies';
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
import { loadServiceInfoRequest, loadServiceSchedule } from '../../../actions/service';
import { loadNotificationsRequest } from '../../../actions/notifications';
import { loadProfileRequest } from '../../../actions/user';
import ResponsiveSummary from '../../../components/ServiceDetail/ResponsiveSummary';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_backUrl;

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
    const [searchResult, setSearchResult] = useState<ParsedUrlQuery | null>(null);

    useEffect(() => {
        setSearchResult(router.query);
    }, [router.isReady, router.query]);

    const { service } = useSelector((state: RootState) => state.service);

    return (
        <>
            {service && searchResult ? (
                <Layout title="Service Detail">
                    <>
                        <Global />
                        <Wrapper>
                            <Container>
                                <Detail>
                                    <Swiper service={service} />
                                    <ResponsiveSummary service={service} searchResult={searchResult} />
                                    <Navigation id={service._id} date={searchResult.date} time={searchResult.time} />
                                    <Description service={service} />
                                    <ReviewComponent serviceId={service._id} />
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

    @media ${(props) => props.theme.mobile} {
        padding: 0;
    }
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
    @media ${(props) => props.theme.mobile} {
        flex: 0;
        width: 100vw;
    }
`;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    if (cookies.userId && cookies.token) {
        context.store.dispatch(loadProfileRequest(cookies.userId));
        context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
    }
    if (context.params?.serviceId) {
        const result = await axios.get(`api/v1/services/schedule?serviceId=${context.params?.serviceId}`);
        context.store.dispatch(loadServiceSchedule(result.data));
        context.store.dispatch(loadServiceInfoRequest(context.params?.serviceId));
    }

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default ServiceDetail;
