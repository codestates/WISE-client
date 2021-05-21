import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
// import PopularSection from '../components/PopularSection';
import TotalSection from '../components/TotalSection';
import { loadMyInfo, LOG_IN_SUCCESS } from '../reducers/user';

const SearchResult = () => {
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
    max-width: 1200px;
`;

export default SearchResult;
