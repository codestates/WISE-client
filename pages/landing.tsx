import { ReactElement } from 'react';
import { createGlobalStyle } from 'styled-components';
import Section1 from '../components/LandingPage/Section1';
import Section2 from '../components/LandingPage/Section2';
import Layout from '../components/Layout';

const Global = createGlobalStyle`
  #__next {
    height: 420vh;

  }

  header {
    position: sticky;
    top: 0;
    z-index: 10;
  }
`;

const LandingPage = (): ReactElement => (
    <>
        <Layout>
            <Global />
            <Section1 />
            <Section2 />
            {/* <Wrapper>
                <h1>건강한 시니어 라이프를 위해</h1>
                <h3>병원은 저희가 같이 동행해 드릴게요.</h3>
            </Wrapper>
            <Wrapper>
                <h1>건강한 시니어 라이프를 위해</h1>
                <h3>병원은 저희가 같이 동행해 드릴게요.</h3>
            </Wrapper>
            <Wrapper>
                <h1>건강한 시니어 라이프를 위해</h1>
                <h3>병원은 저희가 같이 동행해 드릴게요.</h3>
            </Wrapper> */}
        </Layout>
    </>
);

export default LandingPage;
