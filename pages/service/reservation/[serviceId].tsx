import React, { useState, useCallback, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// import { useRouter } from 'next/router';
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
import { LOAD_SERVICE_INFO_REQUEST } from '../../../actions/service';
import { loadNotificationsRequest } from '../../../actions/notifications';
import { loadProfileRequest } from '../../../actions/user';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const ReservationDetail = () => {
    const router = useRouter();
    const { service } = useSelector((state: RootState) => state.service);
    console.log(service);

    const [searchResult, setSearchResult] = useState<ParsedUrlQuery | null>(null);

    useEffect(() => {
        console.log(router.isReady, router.query);
        setSearchResult(router.query);
    }, [router.isReady, router.query]);

    const [hours, setHours] = useState(1);

    const handleChangehours = useCallback((value) => {
        setHours(value);
    }, []);

    return (
        <>
            {service && searchResult ? (
                <Layout title="Reservation">
                    <>
                        <Global />
                        <Wrapper>
                            <Reservation service={service} handleChangehours={handleChangehours} hours={hours} />
                            <AssistantInfo
                                service={service}
                                hours={hours}
                                date={searchResult.date}
                                time={searchResult.time}
                            />
                        </Wrapper>
                    </>
                </Layout>
            ) : (
                ''
            )}
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3rem;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    context.store.dispatch(loadProfileRequest(cookies.userId));
    context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
    context.store.dispatch({
        type: LOAD_SERVICE_INFO_REQUEST,
        serviceId: context.params?.serviceId,
    });
    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default ReservationDetail;
