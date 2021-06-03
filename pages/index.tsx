import { END } from 'redux-saga';
import styled, { createGlobalStyle } from 'styled-components';
import nookies from 'nookies';
import { loadNotificationsRequest } from '../actions/notifications';
import { loadProfileRequest } from '../actions/user';
import Section1 from '../components/LandingPage/Section1';
import Section2 from '../components/LandingPage/Section2';
import Section3 from '../components/LandingPage/Section3';
import Section4 from '../components/LandingPage/Section4';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import wrapper from '../store/configureStore';

const Global = createGlobalStyle`
  header {
    /* glassmorphism effect */
    background: rgba(255, 255, 255, 0.25);
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(255,255,255,0.25);
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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    context.store.dispatch(loadProfileRequest(cookies.userId));
    context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

const Wrapper = styled.div`
    height: 520vh;
`;

export default LandingPage;
