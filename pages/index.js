import styled, { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import PopularSection from '../components/PopularSection';
import TotalSection from '../components/TotalSection';

const Global = createGlobalStyle`
    .dCaWGQ  {
        position: static;
    }
`;

const Home = (): JSX.Element => (
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
`;

export default Home;
