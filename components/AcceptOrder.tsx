import Link from 'next/link';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CancelButton, ActionButton } from './style';
import AcceptSuccessModal from './AcceptSuccessModal';
import { RootState } from '../reducers';
import { acceptOrderRequest, rejectOrderRequest } from '../actions/order';
import ResultModal from './ResultModal';

type Props = {
    orderId: string;
};

const AcceptOrder = ({ orderId }: Props) => {
    const { accessToken } = useSelector((state: RootState) => state.user);
    const { acceptOrderDone, rejectOrderDone, acceptOrderError, rejectOrderError } = useSelector(
        (state: RootState) => state.order,
    );

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setShowModal(false);
        console.log('clicked!');
    }, []);

    useEffect(() => {
        console.log('reservation accepted', acceptOrderDone);
        if (acceptOrderDone || rejectOrderDone || acceptOrderError || rejectOrderError) {
            setShowModal((state) => !state);
            console.log('modal open!');
        }
    }, [acceptOrderDone, rejectOrderDone, acceptOrderError, rejectOrderError]);

    const handleClickAccept = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(acceptOrderRequest(orderId, accessToken, 'accept'));
        },
        [accessToken, orderId, dispatch],
    );

    // 거절했을 때, 유저에게 알림으로 거절했다고 알려줘야함 -> delete reservation
    const handleClickReject = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(rejectOrderRequest(orderId, accessToken));
        },
        [accessToken, orderId, dispatch],
    );

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

            {/* {showModal && (
                <AcceptSuccessModal
                    onClose={onCloseModal}
                    success={reservationAcceptedDone}
                    reject={reservationRejectedDone}
                    acceptError={reservationAcceptedError}
                    rejectError={reservationRejectedError}
                />
            )} */}
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
`;

export default AcceptOrder;
