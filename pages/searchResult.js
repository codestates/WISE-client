import styled from 'styled-components';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
// import PopularSection from '../components/PopularSection';
import TotalSection from '../components/TotalSection';

const SearchResult = () => (
    <Layout title="WISE | Search">
        <Wrapper>
            <SearchBar />
            <TotalSection title="검색 결과" />
        </Wrapper>
    </Layout>
);

const Wrapper = styled.div`
    // border: 1px solid black;
    padding: 3rem;
    max-width: 1200px;
`;

export default SearchResult;
