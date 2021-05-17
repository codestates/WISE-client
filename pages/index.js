import styled, { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import PopularSection from '../components/PopularSection';
import TotalSection from '../components/TotalSection';

const Global = createGlobalStyle`
    // footer {
    //     position: static;
    // }
`;

const Home = () => (
    <Layout>
        <Global />
        <Wrapper>
            <SearchBar />
            <PopularSection />
            <TotalSection title="전체 어시스턴트" />
        </Wrapper>
    </Layout>
);

const Wrapper = styled.div`
    // border: 1px solid black;
    padding: 3rem;
    max-width: 1200px;
`;

export default Home;
