import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { END } from 'redux-saga';
import nookies from 'nookies';
import { useEffect } from 'react';
import AssistantInfo from '../../../components/AssistantInfo';
import { RootState } from '../../../reducers/index';
import Loading from '../../../components/Loading';
import OrderItem from '../../../components/payment/OrderItem';
import ReservationInfo from '../../../components/reservation/ReservationInfo';
import { WarningBox } from '../../../components/style/style';
import Layout from '../../../layout/Layout';
import { loadOrderInfoRequest } from '../../../actions/order';
import { loadServiceInfoRequest } from '../../../actions/service';
import { Global } from '../../../components/style/global';
import { loadNotificationsRequest } from '../../../actions/notifications';
import { loadProfileRequest } from '../../../actions/user';
import wrapper from '../../../store/configureStore';

const Payment = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { me } = useSelector((state: RootState) => state.user);
    const { service } = useSelector((state: RootState) => state.service);
    const { orderInfo } = useSelector((state: RootState) => state.order);

    useEffect(() => {
        if (!me) {
            router.push('/user/signin');
        }
    }, [router, me]);

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
                                    <WithdrawlBtn>홈으로 돌아가기</WithdrawlBtn>
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
                                            <h1>결제하기</h1>
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

const WithdrawlBtn = styled.div`
    font-size: 0.9rem;
    width: 100%;
    color: #aaa;
    text-align: center;
    margin-top: 1rem;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    if (cookies.userId && cookies.token) {
        context.store.dispatch(loadProfileRequest(cookies.userId));
        context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
    } else {
        return {
            redirect: {
                permanent: false,
                destination: '/user/signin',
            },
        };
    }
    if (context.params) {
        context.store.dispatch(loadOrderInfoRequest(context.params.id, cookies.token));
    }

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 3rem;
    margin-bottom: 5rem;

    i {
        cursor: pointer;
    }

    @media ${(props) => props.theme.tablet} {
        flex-direction: column;
        margin-bottom: 3rem;
    }

    @media ${(props) => props.theme.mobile} {
        padding: 2rem 0;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 1rem 1.5rem;
    h1 {
        margin-top: 0.5rem;
    }

    @media ${(props) => props.theme.tablet} {
        position: absolute;
        left: 16%;
        top: 3rem;
    }

    @media ${(props) => props.theme.mobile} {
        left: 5%;
    }
`;

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;

    @media ${(props) => props.theme.tablet} {
        order: -1;
    }
`;

export default Payment;
