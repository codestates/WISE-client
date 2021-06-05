import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import styled from 'styled-components';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { loadNotificationsRequest } from '../../actions/notifications';
import { loadOrderInfoRequest } from '../../actions/order';
import { loadServiceInfoRequest } from '../../actions/service';
import { loadProfileRequest } from '../../actions/user';
import AssistantInfo from '../../components/AssistantInfo';
import Loading from '../../components/Loading';
import AddReview from '../../components/Review/AddReview';
import Layout from '../../layout/Layout';
import { RootState } from '../../reducers';
import wrapper from '../../store/configureStore';

const Review = () => {
    const router = useRouter();
    const { me } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const { orderInfo } = useSelector((state: RootState) => state.order);
    const { service } = useSelector((state: RootState) => state.service);

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
            {orderInfo && service ? (
                <Layout title="WISE | HOME">
                    <Wrapper>
                        <Title>
                            <h1>{orderInfo.customer.name}님의 소중한 후기를 남겨주세요!</h1>
                        </Title>
                        <Body>
                            <AddReview order={orderInfo} />
                            <AssistantInfo
                                service={service}
                                hours={orderInfo.hours}
                                date={moment(orderInfo.date).format('YYYY-MM-DD')}
                                time={orderInfo.time}
                            />
                        </Body>
                    </Wrapper>
                </Layout>
            ) : (
                <Loading />
            )}
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 3rem;

    @media ${(props) => props.theme.mobile} {
        padding: 0;
        padding-bottom: 3rem;
    }
`;

const Body = styled.div`
    display: flex;

    @media ${(props) => props.theme.tablet} {
        flex-direction: column;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-top: 3rem;

    h1 {
        margin-bottom: 0;
    }

    @media ${(props) => props.theme.mobile} {
        font-size: 0.7rem;
    }
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
    if (context.params?.id) {
        context.store.dispatch(loadOrderInfoRequest(context.params.id, cookies.token));
    }

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default Review;
