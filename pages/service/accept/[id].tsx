import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React, { useEffect } from 'react';
import AcceptOrder from '../../../components/AcceptOrder';
import { RootState } from '../../../reducers';
import Layout from '../../../layout/Layout';

import Loading from '../../../components/Loading';
import { ActionButton, WarningBox } from '../../../components/style/style';
import ReservationInfo from '../../../components/reservation/ReservationInfo';
import { loadOrderInfoRequest } from '../../../actions/order';

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
    const { orderInfo, loadOrderInfoError } = useSelector((state: RootState) => state.order);
    console.log(orderInfo);

    useEffect(() => {
        if (accessToken) {
            dispatch(loadOrderInfoRequest(id, accessToken));
        }
    }, [id, accessToken, dispatch]);

    return (
        <>
            {orderInfo ? (
                <Layout title="Reservation accept">
                    <>
                        <Global />
                        <Wrapper>
                            <ReservationInfo reservationInfo={orderInfo} />
                            <Divide />
                            <AcceptOrder orderId={id} />
                        </Wrapper>
                    </>
                </Layout>
            ) : (
                <>
                    {loadOrderInfoError ? (
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
