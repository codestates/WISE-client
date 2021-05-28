import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import SearchBar from '../components/home/SearchBar';
// import PopularSection from '../components/PopularSection';

import { loadPopularServicesRequest, loadTotalServicesRequest } from '../actions/service';
import wrapper from '../store/configureStore';
import { RootState } from '../reducers';
import Layout from '../layout/Layout';
import TotalSection from '../components/home/TotalSection';

const Home = () => {
    const dispatch = useDispatch();

    const { totalServices, totalServicesLoading, totalServicesCount } = useSelector(
        (state: RootState) => state.service,
    );
    const [page, setPage] = useState(2);

    useEffect(() => {
        function onScroll() {
            if (
                window.pageYOffset + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (!totalServicesLoading && totalServicesCount > totalServices.length) {
                    dispatch(loadTotalServicesRequest(page));
                    setPage((prev) => prev + 1);
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [totalServicesLoading, totalServicesCount, dispatch, page, totalServices]);

    return (
        <Layout title="WISE | HOME">
            <Wrapper>
                <SearchBar />
                {/* <PopularSection /> */}
                <TotalSection title="전체 어시스턴트" />
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    padding: 3rem;
    width: 100vw;
    max-width: 1200px;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    context.store.dispatch(loadPopularServicesRequest());
    context.store.dispatch(loadTotalServicesRequest(1));
    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default Home;
