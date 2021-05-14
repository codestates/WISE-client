import { ReactElement } from 'react';
import { createGlobalStyle } from 'styled-components';
import Section1 from '../components/LandingPage/Section1';
import Section2 from '../components/LandingPage/Section2';
import Section3 from '../components/LandingPage/Section3';
import Section4 from '../components/LandingPage/Section4';
import Layout from '../components/Layout';

const Global = createGlobalStyle`
  #__next {
    height: 520vh;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  footer {
      position: absolute;
      bottom: 0;
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

const LandingPage = (): ReactElement => (
    <Layout>
        <Global />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
    </Layout>
);

export default LandingPage;
