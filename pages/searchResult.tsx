import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import TotalSection from '../components/TotalSection';
import { RootState } from '../reducers';
import { loadSearchServiceRequest } from '../reducers/service';

const SearchResult = () => {
    const dispatch = useDispatch();

    const { searchService, searchServiceLoading, searchServiceCount, searchQuery } = useSelector(
        (state: RootState) => state.service,
    );
    const [page, setPage] = useState(2);

    useEffect(() => {
        function onScroll() {
            if (
                window.pageYOffset + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (!searchServiceLoading && searchServiceCount > searchService.length) {
                    dispatch(loadSearchServiceRequest({ ...searchQuery, page }));
                    setPage((prev) => prev + 1);
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [searchServiceLoading, searchServiceCount, dispatch, page, searchService, searchQuery]);

    return (
        <Layout title="WISE | Search">
            <Wrapper>
                <SearchBar />
                <TotalSection title="검색 결과" />
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
