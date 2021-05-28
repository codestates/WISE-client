import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadSearchServicesRequest } from '../actions/service';

import SearchBar from '../components/home/SearchBar';
import TotalSection from '../components/home/TotalSection';
import Layout from '../layout/Layout';

import { RootState } from '../reducers';

const SearchResult = () => {
    const dispatch = useDispatch();

    const { searchServices, searchServicesLoading, searchServicesCount, searchQuery } = useSelector(
        (state: RootState) => state.service,
    );
    const [page, setPage] = useState(2);
    console.log(searchQuery);
    useEffect(() => {
        function onScroll() {
            if (
                window.pageYOffset + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (!searchServicesLoading && searchServicesCount > searchServices.length) {
                    dispatch(loadSearchServicesRequest({ ...searchQuery, page }));
                    setPage((prev) => prev + 1);
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [searchServicesLoading, searchServicesCount, dispatch, page, searchServices, searchQuery]);

    return (
        <Layout title="WISE | Search">
            <Wrapper>
                <SearchBar />
                <TotalSection title="검색 결과" searchQuery={searchQuery} />
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

export default SearchResult;
