import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CancelButton, ActionButton } from './button-style';
import { RESERVATION_ACCEPT_REQUEST, RESERVATION_REJECT_REQUEST } from '../reducers/service';
import AcceptSuccessModal from './AcceptSuccessModal';

const ReservationInfo = ({ reservationInfo, reservationId }) => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.user);
    const { reservationAcceptedDone, reservationAcceptedError } = useSelector((state) => state.service);

    const [showModal, setShowModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setShowModal(false);
        console.log('clicked!');
    }, []);

    useEffect(() => {
        console.log('reservation accepted', reservationAcceptedDone);
        if (reservationAcceptedDone || reservationAcceptedError) {
            setShowModal((state) => !state);
            console.log('modal open!');
        }
    }, [reservationAcceptedDone, reservationAcceptedError]);

    const handleClickAccept = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: RESERVATION_ACCEPT_REQUEST,
            reservationId,
            accessToken,
            state: 'accept',
        });
    }, []);

    // 거절했을 때, 유저에게 알림으로 거절했다고 알려줘야함 -> delete reservation
    const handleClickReject = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: RESERVATION_REJECT_REQUEST,
            reservationId,
            accessToken,
        });
    }, []);

    return (
        <Wrapper>
            <Title>
                <Link href="../../home">
                    <i className="material-icons">chevron_left</i>
                </Link>

                <h1>서비스 요청 상세 내용</h1>
            </Title>
            <DetailWrapper>
                <h4>방문 병원</h4>
                <div>{reservationInfo.hospital}</div>
                <h4>픽업 장소 및 시간</h4>
                <div>{reservationInfo.pickup}</div>
                <h4>필요한 서비스</h4>
                <div>{reservationInfo.content}</div>
                <h4>
                    소요 시간 <span>(최소 1시간 - 모든 이동시간 포함)</span>
                </h4>
                <div>{reservationInfo.hours}</div>
                <h4>참고할 메시지</h4>
                <div>{reservationInfo.message}</div>
            </DetailWrapper>
            <ActionButton onClick={handleClickAccept}>수락하기</ActionButton>
            <CancelButton onClick={handleClickReject}>거절하기</CancelButton>

            {showModal && (
                <AcceptSuccessModal
                    onClose={onCloseModal}
                    success={reservationAcceptedDone}
                    error={reservationAcceptedError}
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
        color: #888;
        font-size: 1rem;
        margin-right: 1rem;
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

const DetailWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28rem;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
`;

ReservationInfo.propTypes = {
    reservationInfo: PropTypes.array.isRequired,
    reservationId: PropTypes.string.isRequired,
};

export default ReservationInfo;
