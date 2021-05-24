import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import PopularSection from '../components/PopularSection';
import TotalSection from '../components/TotalSection';
import { loadMyInfo, loadService } from '../reducers/user';

const Home = () => {
    const dispatch = useDispatch();
    const { me, popularService, service, loadServiceDone, loadServiceLoading } = useSelector((state) => state.user);

    const [page, setPage] = useState(1);

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

    useEffect(() => {
        dispatch(loadService(page));
    }, []);

    useEffect(() => {
        if (loadServiceDone) {
            setPage((prev) => prev + 1);
        }
    }, [loadServiceDone]);
    console.log(page);
    useEffect(() => {
        function onScroll() {
            if (
                window.pageYOffset + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (!loadServiceLoading) {
                    dispatch(loadService(page));
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
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
`;

export default Home;
