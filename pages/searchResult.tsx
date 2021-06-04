import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import styled from 'styled-components';
import nookies from 'nookies';
import { loadNotificationsRequest } from '../actions/notifications';
import { loadSearchServicesRequest } from '../actions/service';
import { loadProfileRequest } from '../actions/user';
import SearchBar from '../components/home/SearchBar';
import SearchSection from '../components/home/SearchSection';

import Layout from '../layout/Layout';

import { RootState } from '../reducers';
import wrapper from '../store/configureStore';
import ServiceSection from '../components/home/ServiceSection';

const SearchResult = () => {
    const dispatch = useDispatch();

    const { searchServices, loadSearchServicesLoading, searchServicesCount, searchQuery } = useSelector(
        (state: RootState) => state.service,
    );
    const [page, setPage] = useState(2);

    useEffect(() => {
        function onScroll() {
            if (
                window.pageYOffset + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (!loadSearchServicesLoading && searchServicesCount > searchServices.length) {
                    dispatch(loadSearchServicesRequest({ ...searchQuery, page }));
                    setPage((prev) => prev + 1);
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [loadSearchServicesLoading, searchServicesCount, dispatch, page, searchServices, searchQuery]);

    return (
        <Layout title="WISE | Search">
            <Wrapper>
                <SearchBar />
                <ServiceSection title="검색 결과" searchQuery={searchQuery} />
            </Wrapper>
        </Layout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    if (cookies.userId && cookies.token) {
        context.store.dispatch(loadProfileRequest(cookies.userId));
        context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
        context.store.dispatch(END);
        await context.store.sagaTask?.toPromise();
    }
});

const Wrapper = styled.div`
    // border: 1px solid black;
    width: 100vw;
    padding: 24px;
    max-width: 1248px;
`;

export default SearchResult;
