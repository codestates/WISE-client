/* eslint-disable import/namespace */
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import nookies from 'nookies';
import PopularSection from '../components/home/PopularSection';

import { loadPopularServicesRequest, loadTotalServicesRequest } from '../actions/service';
import wrapper from '../store/configureStore';
import { RootState } from '../reducers';
import Layout from '../layout/Layout';
import SearchBar from '../components/home/SearchBar';
import { loadProfileRequest } from '../actions/user';
import { loadNotificationsRequest } from '../actions/notifications';
import ServiceSection from '../components/home/ServiceSection';

const Home = () => {
    const dispatch = useDispatch();
    const { totalServices, loadTotalServicesLoading, totalServicesCount } = useSelector(
        (state: RootState) => state.service,
    );
    const [page, setPage] = useState(2);

    useEffect(() => {
        function onScroll() {
            if (
                window.pageYOffset + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (!loadTotalServicesLoading && totalServicesCount > totalServices.length) {
                    dispatch(loadTotalServicesRequest(page));
                    setPage((prev) => prev + 1);
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [loadTotalServicesLoading, totalServicesCount, dispatch, page, totalServices]);
    return (
        <Layout title="WISE | HOME">
            <Wrapper>
                <SearchBar />
                <PopularSection />
                <ServiceSection title="전체 어시스턴트" />
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    // padding: 3rem;
    width: 100vw;
    padding: 24px;
    max-width: 1248px;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    if (cookies.userId && cookies.token) {
        context.store.dispatch(loadProfileRequest(cookies.userId));
        context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
    }
    context.store.dispatch(loadPopularServicesRequest());
    context.store.dispatch(loadTotalServicesRequest(1));
    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default Home;
