import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Pagination } from 'antd';
import { loadFirstReviewRequest, loadMoreReviewsRequest } from '../../actions/review';
import { Review } from '../../interfaces/data/review';
import { RootState } from '../../reducers';
// import Loading from '../Loading';

type Props = {
    serviceId: string;
};

const ReviewComponent = ({ serviceId }: Props) => {
    const dispatch = useDispatch();
    const { reviews, totalReviews } = useSelector((state: RootState) => state.review);
    const IMAGE_URL = process.env.NEXT_PUBLIC_imageURL;

    useEffect(() => {
        dispatch(loadFirstReviewRequest(serviceId));
    }, [serviceId, dispatch]);

    // pagination
    const [current, setCurrent] = useState(1);

    const handleChangePage = useCallback((page) => {
        setCurrent(page);
    }, []);

    useEffect(() => {
        dispatch(loadMoreReviewsRequest(serviceId, current));
    }, [current, dispatch, serviceId]);

    return (
        <>
            <Wrapper id="review">
                <h2>후기 ({totalReviews || '0'}개)</h2>

                {reviews && reviews.length > 0 ? (
                    <ReviewBox>
                        {reviews.map((review: Review) => (
                            <ReviewItem key={review._id}>
                                <Profile>
                                    {review.customer.image ? (
                                        <img src={`${IMAGE_URL}${review.customer.image}`} alt="profile" />
                                    ) : (
                                        <img src="/images/avatar_default.png" alt="profile" />
                                    )}
                                    <span>
                                        <div>{review.customer.name}</div>
                                        <h5>{moment(review.createdAt).format('YYYY-MM-DD')}</h5>
                                    </span>
                                </Profile>
                                {/* <span>
                                    <i className="material-icons">star</i>
                                    {review.starRating}
                                </span> */}
                                <div>{review.content}</div>
                            </ReviewItem>
                        ))}
                    </ReviewBox>
                ) : (
                    <NoReviews>후기가 없습니다</NoReviews>
                )}
                <PageWrapper>
                    <Pagination
                        defaultCurrent={1}
                        size="small"
                        total={50}
                        current={current}
                        onChange={handleChangePage}
                    />
                </PageWrapper>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 5rem 0;
    color: #191919;
    width: 100%;
    h2 {
        margin-left: 2rem;
        font-weight: 600;
    }
`;

const ReviewBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const ReviewItem = styled.div`
    padding: 1rem 2rem;

    span {
        font-weight: 500;
    }
`;

const Profile = styled.div`
    display: flex;
    margin-bottom: 1rem;
    img {
        width: 2.4rem;
        margin-right: 1rem;
        align-self: center;
    }
    h5 {
        font-weight: 400;
        color: #555;
    }
`;

const PageWrapper = styled.div`
    display: flex;
    margin-top: 2rem;
    width: 100%;
    justify-content: center;
`;

const NoReviews = styled.div`
    display: flex;
    height: 10rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #aaa;
`;

export default ReviewComponent;
