import { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import Layout from '../../../components/Layout';
import ReservationInfo from '../../../components/ReservationInfo';
import { GET_RESERVATION_INFO_REQUEST } from '../../../reducers/service';
import { loadMyInfo, LOG_IN_SUCCESS } from '../../../reducers/user';
import wrapper from '../../../store/configureStore';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const ReservationAccept = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const { getReservationInfo } = useSelector((state) => state.service);
    console.log(getReservationInfo);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch({
                type: LOG_IN_SUCCESS,
            });
            dispatch(loadMyInfo());
        }
    }, []);

    return (
        <>
            {/* {reservationAccepted.length !== 0 ? ( */}
            <Layout>
                <Global />
                <Wrapper>
                    <h3>서비스 요청이 들어왔어요!</h3>
                    <ReservationInfo reservationInfo={getReservationInfo} reservationId={id} />
                </Wrapper>
            </Layout>
            {/* ) : (
                ''
            )} */}
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3rem;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const { accessToken } = useSelector((state) => state.user);

    context.store.dispatch({
        type: GET_RESERVATION_INFO_REQUEST,
        reservationId: context.params.id,
        accessToken,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default ReservationAccept;
