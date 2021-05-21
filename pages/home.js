import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import PopularSection from '../components/PopularSection';
import TotalSection from '../components/TotalSection';
import { loadMyInfo, LOG_IN_SUCCESS } from '../reducers/user';

const Home = () => {
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
        <Layout title="WISE | HOME">
            <Wrapper>
                <SearchBar />
                <PopularSection />
                <TotalSection title="전체 어시스턴트" />
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    padding: 3rem;
    max-width: 1200px;
    z-index: -1;
`;

export default Home;
