import { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import Layout from '../../../components/Layout';
import ReservationInfo from '../../../components/ReservationInfo';
import { GET_RESERVATION_INFO_REQUEST } from '../../../reducers/service';
import { loadMyInfo, LOG_IN_SUCCESS } from '../../../reducers/user';
import wrapper from '../../../store/configureStore';
import { RootState } from '../../../reducers';

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

    const { getReservationInfo } = useSelector((state: RootState) => state.service);
    console.log(getReservationInfo);

    // useEffect(() => {
    //     const userId = localStorage.getItem('userId');
    //     if (userId) {
    //         dispatch({
    //             type: LOG_IN_SUCCESS,
    //         });
    //         dispatch(loadMyInfo());
    //     }
    // }, [dispatch]);

    return (
        <Layout>
            <Global />
            {getReservationInfo ? (
                <Wrapper>
                    <h2>서비스 요청을 자세히 확인해주세요!</h2>
                    <ReservationInfo reservationInfo={getReservationInfo} orderId={id} />
                </Wrapper>
            ) : (
                <BadRequest>
                    <ExclamationCircleOutlined />
                    <h2>존재하지 않는 요청입니다 :(</h2>
                </BadRequest>
            )}
        </Layout>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3rem;
    h2 {
        text-align: center;
        font-weight: 700;
    }
`;

const BadRequest = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
    > .anticon {
        font-size: 5rem;
        text-align: center;
        margin-bottom: 2rem;
        color: #db454c;
    }
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // const { accessToken } = useSelector((state: RootState) => state.user);

    context.store.dispatch({
        type: GET_RESERVATION_INFO_REQUEST,
        orderId: context.params?.id,
        accessToken:
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkOWNmYWE4OGVmMDViNDI0YmU2MjA1ZjQ2YjE4OGQ3MzI1N2JjNDIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiR2FoZWUgS2ltIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSndkZHZ5cXp6Vmp1eEVId25VMnpfQ28xZHk3dDlUMWNXTUVOM3NXPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3dpc2UtNGJiNGMiLCJhdWQiOiJ3aXNlLTRiYjRjIiwiYXV0aF90aW1lIjoxNjIyMDAzMzY4LCJ1c2VyX2lkIjoiNVQ5MzZFWmJva1NsZWxjaTNCYzJ2TXhXbTZWMiIsInN1YiI6IjVUOTM2RVpib2tTbGVsY2kzQmMydk14V202VjIiLCJpYXQiOjE2MjIwMDMzNjgsImV4cCI6MTYyMjAwNjk2OCwiZW1haWwiOiJya2dtbDk4MTEwNUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDUxMDAwNTA5ODU1NjQwOTkzMSJdLCJlbWFpbCI6WyJya2dtbDk4MTEwNUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.KR_yZM4qXBQUNNnxb5_q4lMyOvhVAZphxJaI0L80H6KKt1YqsMw9ZZ48tQ-BOD9j6nMKdZC9dKHaEdqNlugQcQV5PDE2gt4Hw2Sae6sAwiWz_TRvfVqNaiw29aROUMTNtA_3x88N5AJsGvs1__jGnfUKIhol7iKKTTdVmfCbrB8hjnjotJe04pVj37dqLZfQTSpAA10WOa1ILVK_jbzL7s84dnvX6S3rWlfOXL0nLIfgTo3PrkE-1q2W3NPUIXBRbyXA_8fhGqz-5yjpuAY3gOCONva30Zq99kgmFBYMgH9RKI4vlxR0o5NU7wCXMhjQwgnIWnUvrrNSuTG4ZkzJOQ',
    });

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default ReservationAccept;
