/* eslint-disable no-underscore-dangle */
import Link from 'next/link';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { CancelButton, ActionButton } from '../style/style';
import { RootState } from '../../reducers';
import { addNotificationRequest } from '../../actions/notifications';
import ResultModal from '../ResultModal';
import { Order } from '../../interfaces/data/order';
import { addReviewRequest } from '../../actions/review';

type Props = {
    order: Order;
};

const AddReview = ({ order }: Props) => {
    const dispatch = useDispatch();
    const { addReviewDone, addReviewError, review } = useSelector((state: RootState) => state.review);

    // star rating
    const [ratingValue, setRatingValue] = useState<number | null>(1);

    // review content
    const [content, setContent] = useState('');
    const onChanageContent = useCallback((e) => {
        e.preventDefault();
        setContent(e.target.value);
    }, []);

    const handleAddReview = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(addReviewRequest(order._id, ratingValue, content));
        },
        [content, dispatch, order._id, ratingValue],
    );

    // result modal
    const [showModal, setShowModal] = useState(false);

    // POST notification
    const onCloseModal = useCallback(() => {
        if (review) {
            const notification = {
                recipient: order.assistant._id,
                subject: order._id,
                clientUrl: `/service/detail/${review.service}`,
                content: '새로운 후기가 1건 올라왔어요',
            };
            dispatch(addNotificationRequest(notification));
            console.log('notification sent!');

            setShowModal(false);
        } else {
            setShowModal(false);
        }
    }, [dispatch, order._id, order.assistant._id, review]);

    useEffect(() => {
        if (addReviewDone || addReviewError) {
            setShowModal(true);
            console.log('modal open!');
        }
    }, [addReviewDone, addReviewError]);

    return (
        <Wrapper>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">{order.assistant.name} 어시스턴트와의 경험은 어떠셨나요?</Typography>
                <Rating
                    name="star-rating"
                    value={ratingValue}
                    onChange={(_event, newValue) => {
                        setRatingValue(newValue);
                    }}
                />
            </Box>
            <ContentWrapper>
                <h4>아래에 후기를 작성해주세요</h4>
                <TextareaWrapper>
                    <textarea
                        name="message"
                        placeholder="ex) 약속 시간보다 먼저 도착해서 미리 설명도 들어주시고 엄마도 잘 보살펴주셔서 너무 감사해요~ "
                        required
                        onChange={onChanageContent}
                    />
                </TextareaWrapper>
                <ActionButton onClick={handleAddReview}>작성 완료</ActionButton>
                <Link href="/home">
                    <CancelButton>나중에 하기</CancelButton>
                </Link>
            </ContentWrapper>

            {showModal && addReviewDone && (
                <ResultModal
                    onClose={onCloseModal}
                    title="후기 남기기"
                    message="성공적으로 작성되었습니다."
                    redirection="home"
                />
            )}
            {showModal && addReviewError && (
                <ResultModal
                    onClose={onCloseModal}
                    title="후기 남기기"
                    message={
                        addReviewError === 'Request failed with status code 403'
                            ? '이미 작성하신 리뷰가 있습니다'
                            : '새로운 로그인이 필요합니다'
                    }
                    redirection="signin"
                />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 0 3rem 3rem 0;
    margin-right: 2rem;
    align-self: center;
    div {
        color: #333;
    }
    span {
        font-size: 2rem;
    }
    h1 {
        margin: 0.5rem;
        font-weight: 600;
    }
    h4 {
        font-size: 1rem;
    }
    h4 > span {
        font-size: 0.7rem;
    }
    i {
        font-size: 2rem;
        cursor: pointer;
    }
`;

const ContentWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28rem;
`;

const TextareaWrapper = styled.div`
    margin-bottom: 2.5rem;
    textarea {
        width: 100%;
        border: 1px solid #e5e5e5;
        border-radius: 0.3rem;
        height: 3.125rem;
        margin: 0.8rem auto 0 auto;
        padding: 0.5rem;
        height: 10rem;
    }
    textarea:focus {
        outline: none;
        border: 1px solid #68d480;
        font-size: 1rem;
    }
`;

export default AddReview;
