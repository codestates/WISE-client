import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadOrderInfoRequest } from '../../actions/order';
import { loadServiceInfoRequest } from '../../actions/service';
import AssistantInfo from '../../components/AssistantInfo';
import Loading from '../../components/Loading';
import AddReview from '../../components/Review/AddReview';
import Layout from '../../layout/Layout';
import { RootState } from '../../reducers';

const Review = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const { accessToken } = useSelector((state: RootState) => state.user);
    const { orderInfo } = useSelector((state: RootState) => state.order);
    const { service } = useSelector((state: RootState) => state.service);

    useEffect(() => {
        if (accessToken) {
            dispatch(loadOrderInfoRequest(id, accessToken));
        }
    }, [id, accessToken, dispatch]);

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
`;

const Body = styled.div`
    display: flex;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-top: 3rem;
`;

export default Review;
