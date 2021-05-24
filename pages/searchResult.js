import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import TotalSection from '../components/TotalSection';
import { loadMyInfo } from '../reducers/user';

const SearchResult = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);

    useEffect(() => {
        if (!me) {
            const userId = localStorage.getItem('userId');
            if (userId) {
                dispatch(loadMyInfo());
            } else {
                Router.replace('/user/signin');
            }
        }
    }, [me]);

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
