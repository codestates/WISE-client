/* eslint-disable import/namespace */
import Link from 'next/link';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CancelButton, ActionButton } from './style/style';
import { RootState } from '../reducers';
import { addNotificationRequest, checkNotificationRequest } from '../actions/notifications';
import ResultModal from './ResultModal';
import { Notification } from '../interfaces/data/notifications';
import { acceptOrderRequest, rejectOrderRequest } from '../actions/order';

type Props = {
    orderId: string | string[];
};

const AcceptOrder = ({ orderId }: Props) => {
    const { acceptOrderDone, acceptOrderError, rejectOrderDone, rejectOrderError, orderInfo } = useSelector(
        (state: RootState) => state.order,
    );
    const { addNotificationDone, notifications } = useSelector((state: RootState) => state.notifications);

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    useEffect(() => {
        if (acceptOrderDone || rejectOrderDone || acceptOrderError || rejectOrderError) {
            setShowModal((state) => !state);
        }
    }, [acceptOrderDone, rejectOrderDone, acceptOrderError, rejectOrderError]);

    const handleClickAccept = useCallback(
        (e) => {
            if (!acceptOrderDone) {
                e.preventDefault();
                dispatch(acceptOrderRequest(orderId, 'accept'));
            }
        },
        [orderId, dispatch, acceptOrderDone],
    );

    // 거절했을 때, 유저에게 알림으로 거절했다고 알려줘야함 -> delete reservation
    const handleClickReject = useCallback(
        (e) => {
            if (!rejectOrderDone) {
                e.preventDefault();
                dispatch(rejectOrderRequest(orderId));
            }
        },
        [orderId, dispatch, rejectOrderDone],
    );

    // POST notification
    useEffect(() => {
        if (!addNotificationDone) {
            if (orderInfo && acceptOrderDone) {
                const notificationData = {
                    recipient: orderInfo.customer._id,
                    subject: orderInfo._id,
                    clientUrl: `/payment/checkout/${orderInfo._id}`,
                    content: `${orderInfo.assistant.name} 어시스턴트가 신청을 수락했습니다`,
                };
                dispatch(addNotificationRequest(notificationData));
            } else if (orderInfo && rejectOrderDone) {
                const notificationData = {
                    recipient: orderInfo.customer._id,
                    subject: orderInfo._id,
                    clientUrl: `/home`,
                    content: `${orderInfo.assistant.name} 어시스턴트가 신청을 거절했어요`,
                };
                dispatch(addNotificationRequest(notificationData));
            }
        }
    }, [dispatch, orderInfo, rejectOrderDone, acceptOrderDone, addNotificationDone]);

    // isChecked로 바꾸기
    useEffect(() => {
        if (addNotificationDone) {
            const thisNotification = notifications.filter(
                (notification: Notification) => notification.subject === orderId,
            )[0];
            dispatch(checkNotificationRequest(thisNotification._id));
        }
    }, [addNotificationDone, dispatch, notifications, orderId]);

    // 결과 모달 띄우기
    useEffect(() => {
        if (addNotificationDone) {
            setShowModal(true);
        }
    }, [addNotificationDone, acceptOrderError, rejectOrderError]);

    return (
        <Wrapper>
            <Title>
                <Link href="/home">
                    <a>
                        <i className="material-icons">chevron_left</i>
                        <p>홈으로 돌아가기</p>
                    </a>
                </Link>
            </Title>
            <h2>서비스 요청을 자세히 확인해주세요!</h2>
            <ActionButton onClick={handleClickAccept}>수락하기</ActionButton>
            <CancelButton onClick={handleClickReject}>거절하기</CancelButton>

            {showModal && acceptOrderDone && (
                <ResultModal
                    onClose={onCloseModal}
                    title="신청 수락하기"
                    message="성공적으로 매칭되었습니다!"
                    redirection="home"
                />
            )}
            {showModal && acceptOrderError && (
                <ResultModal
                    onClose={onCloseModal}
                    title="신청 수락하기"
                    message={acceptOrderError}
                    redirection="home"
                />
            )}
            {showModal && rejectOrderDone && (
                <ResultModal
                    onClose={onCloseModal}
                    title="신청 수락하기"
                    message="서비스 요청을 거절했습니다"
                    redirection="home"
                />
            )}
            {showModal && rejectOrderError && (
                <ResultModal
                    onClose={onCloseModal}
                    title="신청 수락하기"
                    message={rejectOrderError}
                    redirection="home"
                />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 2rem 3rem 3rem;
    margin-top: 15%;
    div {
        color: #333;
        font-weight: 500;
    }
    span {
        color: #888;
        font-size: 1rem;
        margin-right: 1rem;
    }
    h3 {
        margin: 0.5rem;
        font-weight: 600;
    }
    h4 {
        font-size: 1rem;
        margin: 1rem 0 0.5rem;
        color: #58b36b;
        font-weight: 600;
    }
    h4 > span {
        font-size: 0.7rem;
    }
    i {
        font-size: 2rem;
        cursor: pointer;
    }

    @media ${(props) => props.theme.tablet} {
        padding: 0 3rem 3rem;
        width: 70vw;
        margin: 0 auto;
        margin-top: 2rem;
    }

    @media ${(props) => props.theme.mobile} {
        width: 80vw;
        padding-left: 0;
        padding-right: 0;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    a {
        display: flex;
        color: #888;
    }
    p {
        font-size: 1rem;
        margin-top: 0.2rem;
        font-weight: 500;
    }

    @media ${(props) => props.theme.tablet} {
        position: absolute;
        top: 3rem;
        left: 19%;
    }

    @media ${(props) => props.theme.mobile} {
        left: 8%;
    }
`;

export default AcceptOrder;
