import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import AssistantInfo from '../../../components/AssistantInfo';
import { RootState } from '../../../reducers/index';

import Loading from '../../../components/Loading';
import OrderItem from '../../../components/payment/OrderItem';
import ReservationInfo from '../../../components/reservation/ReservationInfo';
import { WarningBox, ActionButton } from '../../../components/style/style';
import Layout from '../../../layout/Layout';
import { loadOrderInfoRequest } from '../../../actions/order';
import { loadServiceInfoRequest } from '../../../actions/service';
import { Global } from '../../../components/style/global';

const Payment = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const { me } = useSelector((state: RootState) => state.user);
    const { service } = useSelector((state: RootState) => state.service);
    const { orderInfo } = useSelector((state: RootState) => state.order);
    console.log(orderInfo);

    useEffect(() => {
        if (me) {
            dispatch(loadOrderInfoRequest(id));
        }
    }, [me, id, dispatch]);

    useEffect(() => {
        if (orderInfo) {
            dispatch(loadServiceInfoRequest(orderInfo.service));
        }
    }, [orderInfo, dispatch]);

    return (
        <>
            {orderInfo?.state === 'complete' ? (
                <Layout title="Checkout">
                    <>
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
                                        <ReservationInfo reservationInfo={orderInfo} />
                                        <OrderItem reservationInfo={orderInfo} />
                                    </Container>
                                    <InfoWrapper>
                                        <AssistantInfo
                                            service={service}
                                            hours={orderInfo.hours}
                                            date={moment(orderInfo.date).format('YYYY-MM-DD')}
                                            time={orderInfo.time}
                                        />
                                    </InfoWrapper>
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
    margin-bottom: 5rem;
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

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export default Payment;
