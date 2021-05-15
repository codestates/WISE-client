import styled, { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
// import PopularSection from '../components/PopularSection';
import TotalSection from '../components/TotalSection';

const Global = createGlobalStyle`
  .dCaWGQ  {
    position: static;
  }
`;

const SearchResult = (): JSX.Element => (
    <Layout>
        <Global />
        <Wrapper>
            <SearchBar />
            <TotalSection title="검색 결과" />
        </Wrapper>
    </Layout>
);

const Wrapper = styled.div`
    // border: 1px solid black;
    padding: 3rem;
`;

export default SearchResult;
