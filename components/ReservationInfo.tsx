import Link from 'next/link';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CancelButton, ActionButton } from './button-style';
import { RESERVATION_ACCEPT_REQUEST, RESERVATION_REJECT_REQUEST } from '../reducers/service';
import AcceptSuccessModal from './AcceptSuccessModal';
import { Order } from '../interfaces/data/service';
import { RootState } from '../reducers';

type Props = {
    reservationInfo: Order;
    orderId: string | string[];
};

const ReservationInfo = ({ reservationInfo, orderId }: Props) => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state: RootState) => state.user);
    const { reservationAcceptedDone, reservationRejectedDone, reservationAcceptedError, reservationRejectedError } =
        useSelector((state: RootState) => state.service);

    const [showModal, setShowModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setShowModal(false);
        console.log('clicked!');
    }, []);

    useEffect(() => {
        console.log('reservation accepted', reservationAcceptedDone);
        if (
            reservationAcceptedDone ||
            reservationRejectedDone ||
            reservationAcceptedError ||
            reservationRejectedError
        ) {
            setShowModal((state) => !state);
            console.log('modal open!');
        }
    }, [reservationAcceptedDone, reservationRejectedDone, reservationAcceptedError, reservationRejectedError]);

    const handleClickAccept = useCallback(
        (e) => {
            e.preventDefault();
            dispatch({
                type: RESERVATION_ACCEPT_REQUEST,
                orderId,
                accessToken,
                state: 'accept',
            });
        },
        [accessToken, orderId, dispatch],
    );

    // 거절했을 때, 유저에게 알림으로 거절했다고 알려줘야함 -> delete reservation
    const handleClickReject = useCallback(
        (e) => {
            e.preventDefault();
            dispatch({
                type: RESERVATION_REJECT_REQUEST,
                orderId,
                accessToken,
            });
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
            <DetailWrapper>
                <h3>서비스 요청 상세 내용</h3>
                <h4>서비스 신청자</h4>
                <div>{reservationInfo.customer.name ? reservationInfo.customer.name : '김가희'}</div>
                <h4>방문 병원</h4>
                <div>{reservationInfo.hospital}</div>
                <h4>픽업 장소 및 시간</h4>
                <div>{reservationInfo.pickup}</div>
                <h4>필요한 서비스</h4>
                <div>{reservationInfo.content}</div>
                <h4>
                    소요 시간 <span>(최소 1시간 - 모든 이동시간 포함)</span>
                </h4>
                <div>{reservationInfo.hours} 시간</div>
                <h4>참고할 메시지</h4>
                <div>{reservationInfo.message}</div>
            </DetailWrapper>
            <ActionButton onClick={handleClickAccept}>수락하기</ActionButton>
            <CancelButton onClick={handleClickReject}>거절하기</CancelButton>

            {showModal && (
                <AcceptSuccessModal
                    onClose={onCloseModal}
                    success={reservationAcceptedDone}
                    reject={reservationRejectedDone}
                    acceptError={reservationAcceptedError}
                    rejectError={reservationRejectedError}
                />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 2rem 3rem 3rem;
    align-self: center;
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

const DetailWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28rem;
    padding: 2rem;
    margin-bottom: 3rem;
    border: 1px solid #f0f0f0;
    border-radius: 0.4rem;
    box-shadow: 0.2rem 0.1rem 0.4rem #ddd;
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

export default ReservationInfo;
