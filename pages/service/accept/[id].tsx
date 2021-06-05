import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { END } from 'redux-saga';
import nookies from 'nookies';
import { useEffect } from 'react';
import AcceptOrder from '../../../components/AcceptOrder';
import { RootState } from '../../../reducers';
import Layout from '../../../layout/Layout';

import Loading from '../../../components/Loading';
import { ActionButton, WarningBox } from '../../../components/style/style';
import ReservationInfo from '../../../components/reservation/ReservationInfo';
import { loadOrderInfoRequest } from '../../../actions/order';
import { loadNotificationsRequest } from '../../../actions/notifications';
import { loadProfileRequest } from '../../../actions/user';
import wrapper from '../../../store/configureStore';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const ReservationAccept = () => {
    const router = useRouter();
    const { me } = useSelector((state: RootState) => state.user);
    const { orderInfo, loadOrderInfoError } = useSelector((state: RootState) => state.order);
    const { id } = router.query;

    useEffect(() => {
        if (!me) {
            router.push('/user/signin');
        }
    }, [router, me]);

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
    h2 {
        text-align: center;
        font-weight: 700;
    }

    @media ${(props) => props.theme.tablet} {
        flex-direction: column;
        margin-top: 4rem;
    }
`;

const Divide = styled.div`
    border-right: 1px solid #ddd;
    height: 100%;

    @media ${(props) => props.theme.tablet} {
        width: 60vw;
        margin: 2rem auto 1rem;
        border-right: 0;
        border-bottom: 1px solid #ddd;
    }

    @media ${(props) => props.theme.mobile} {
        width: 80vw;
    }
`;

export default ReservationAccept;
