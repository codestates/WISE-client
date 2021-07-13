import React, { useState, useCallback, useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import nookies from 'nookies';
import AssistantInfo from '../../../components/AssistantInfo';
import Reservation from '../../../components/reservation/Reservation';
import wrapper from '../../../store/configureStore';
import { RootState } from '../../../reducers';
import Layout from '../../../layout/Layout';
import { loadServiceInfoRequest } from '../../../actions/service';
import { loadNotificationsRequest } from '../../../actions/notifications';
import { loadProfileRequest } from '../../../actions/user';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const ReservationDetail = () => {
    const router = useRouter();
    const { me } = useSelector((state: RootState) => state.user);
    const { service } = useSelector((state: RootState) => state.service);

    const [searchResult, setSearchResult] = useState<ParsedUrlQuery | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!me) {
            router.push('/user/signin');
        }
    }, [router, me]);

    useEffect(() => {
        setSearchResult(router.query);
    }, [router.isReady, router.query]);

    const [hours, setHours] = useState(1);

    const handleChangehours = useCallback((value) => {
        setHours(value);
    }, []);

    return (
        <Wrapper modal={showModal ? 'open' : ''}>
            {service && searchResult ? (
                <Layout title="Reservation">
                    <>
                        <Global />
                        <Container>
                            <Reservation
                                showModal={showModal}
                                setShowModal={setShowModal}
                                service={service}
                                handleChangehours={handleChangehours}
                                hours={hours}
                            />
                            <AssistantInfo
                                service={service}
                                hours={hours}
                                date={searchResult.date}
                                time={searchResult.time}
                            />
                        </Container>
                    </>
                </Layout>
            ) : (
                ''
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div<{ modal?: string }>`
    ${(props) =>
        props.modal === 'open'
            ? css`
                  overflow: hidden;
              `
            : ''}
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3rem;

    @media ${(props) => props.theme.tablet} {
        flex-direction: column;
    }
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    if (cookies.userId && cookies.token) {
        context.store.dispatch(loadProfileRequest(cookies.userId));
        context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
    }
    if (context.params?.serviceId) {
        context.store.dispatch(loadServiceInfoRequest(context.params.serviceId));
    }

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default ReservationDetail;
