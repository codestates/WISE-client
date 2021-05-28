import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import React, { useEffect } from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import AcceptOrder from '../../../components/AcceptOrder';
import { GET_RESERVATION_INFO_REQUEST } from '../../../interfaces/act/service';
import wrapper from '../../../store/configureStore';
import { RootState } from '../../../reducers';
import { getReservationInfoRequest } from '../../../actions/service';
import Loading from '../../../components/Loading';
import ReservationInfo from '../../../components/ReservationInfo';
import { ActionButton, WarningBox } from '../../../components/button-style';

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

    const { accessToken } = useSelector((state: RootState) => state.user);
    const { getReservationInfo, getReservationInfoError } = useSelector((state: RootState) => state.service);
    console.log(getReservationInfo);

    useEffect(() => {
        if (accessToken) {
            dispatch(getReservationInfoRequest(id, accessToken));
        }
    }, [id, accessToken, dispatch]);

    return (
        <>
            {getReservationInfo ? (
                <Layout title="Reservation accept">
                    <>
                        <Global />
                        <Wrapper>
                            <ReservationInfo reservationInfo={getReservationInfo} />
                            <Divide />
                            <AcceptOrder orderId={id} />
                        </Wrapper>
                    </>
                </Layout>
            ) : (
                <>
                    {getReservationInfoError ? (
                        <Layout title="Reservation accept">
                            <>
                                <Global />
                                <WarningBox>
                                    <Link href="/home">
                                        <a>
                                            <ExclamationCircleOutlined />
                                            <h2>에러 발생! 로그아웃 후 다시 로그인 해주세요 :(</h2>
                                            <ActionButton>로그인 하러가기</ActionButton>
                                        </a>
                                    </Link>
                                </WarningBox>
                            </>
                        </Layout>
                    ) : (
                        <Loading />
                    )}
                </>
            )}
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 3rem;
    h2 {
        text-align: center;
        font-weight: 700;
    }
`;

const Divide = styled.div`
    border-right: 1px solid #ddd;
    height: 100%;
`;

export default ReservationAccept;
