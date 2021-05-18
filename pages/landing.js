import styled, { createGlobalStyle } from 'styled-components';
import Section1 from '../components/LandingPage/Section1';
import Section2 from '../components/LandingPage/Section2';
import Section3 from '../components/LandingPage/Section3';
import Section4 from '../components/LandingPage/Section4';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Global = createGlobalStyle`
  header {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .hidden,
  .visible {
    transition: all 1.5s ease-in-out 200ms;
    will-change: opacity;
    opacity: 0;
    }
    
  .visible {
      opacity: 1;
    transform: translateY(-6rem);
    }
`;

const LandingPage = () => (
    <Wrapper>
        <Header />
        <Global />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Footer />
    </Wrapper>
);

const Wrapper = styled.div`
    height: 520vh;
`;

export default LandingPage;
