import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Layout from '../../../components/Layout';
import AssistantInfo from '../../../components/AssistantInfo';
import { RootState } from '../../../reducers/index';
import ReservationInfo from '../../../components/ReservationInfo';
import OrderItem from '../../../components/OrderItem';
import { getReservationInfoRequest, getServiceInfoRequest } from '../../../actions/service';
import Loading from '../../../components/Loading';
import { ActionButton, WarningBox } from '../../../components/button-style';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const Payment = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const { accessToken } = useSelector((state: RootState) => state.user);
    const { service, getReservationInfo } = useSelector((state: RootState) => state.service);
    console.log(getReservationInfo);
    useEffect(() => {
        if (accessToken) {
            dispatch(getReservationInfoRequest(id, accessToken));
        }
    }, [id, accessToken, dispatch]);

    useEffect(() => {
        if (getReservationInfo) {
            dispatch(getServiceInfoRequest(getReservationInfo.service));
        }
    }, [getReservationInfo, dispatch]);

    return (
        <>
            {getReservationInfo?.state === 'complete' ? (
                <Layout title="Checkout">
                    <>
                        <Global />

                        <WarningBox>
                            <Link href="/home">
                                <a>
                                    <ExclamationCircleOutlined />
                                    <div style={{ fontSize: '1rem' }}>이미 결제가 완료된 서비스입니다.</div>
                                    <ActionButton>홈으로 돌아가기</ActionButton>
                                </a>
                            </Link>
                        </WarningBox>
                    </>
                </Layout>
            ) : (
                <>
                    {service ? (
                        <Layout title="Checkout">
                            <>
                                <Global />
                                <Wrapper>
                                    <Container>
                                        <Title>
                                            <Link href="/">
                                                <i className="material-icons">chevron_left</i>
                                            </Link>
                                            <h2>결제하기</h2>
                                        </Title>
                                        <ReservationInfo reservationInfo={getReservationInfo} />
                                        <OrderItem reservationInfo={getReservationInfo} />
                                    </Container>
                                    <AssistantInfo service={service} hours={getReservationInfo.hours} />
                                </Wrapper>
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
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 1rem 1.5rem;
    h2 {
        margin-top: 0.5rem;
    }
`;

export default Payment;
