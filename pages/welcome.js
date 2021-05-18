import styled from 'styled-components';
import Layout from '../components/Layout';

const Welcome = () => (
    <Layout title="WISE | HOME">
        <CoverImg src="/images/wise_bg.png" />
        <Wrapper>hi</Wrapper>
    </Layout>
);

const Wrapper = styled.div`
    // border: 1px solid black;
    padding: 3rem;
    max-width: 1200px;
`;

const CoverImg = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    z-index: -50;
`;

export default Welcome;
