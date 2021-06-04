/* eslint-disable no-underscore-dangle */
import Link from 'next/link';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CancelButton, ActionButton } from '../style/style';
import { RootState } from '../../reducers';
import { Service } from '../../interfaces/data/service';
import { addOrderRequest } from '../../actions/order';
import { addNotificationRequest } from '../../actions/notifications';
import ResultModal from '../ResultModal';
import { OrderReq } from '../../interfaces/data/order';

type Props = {
    service: Service;
    hours: number;
    handleChangehours: (value: number) => void;
};

const Reservation = ({ service, hours, handleChangehours }: Props) => {
    const dispatch = useDispatch();

    const { me } = useSelector((state: RootState) => state.user);
    const { addOrderDone, addOrderError, orderInfo } = useSelector((state: RootState) => state.order);
    const { addNotificationDone } = useSelector((state: RootState) => state.notifications);

    const onChangehours = useCallback(
        (e) => {
            handleChangehours(Number(e.target.value));
        },
        [handleChangehours],
    );

    const [hospital, setHospital] = useState('');
    const onChanageDestination = useCallback((e) => {
        e.preventDefault();
        setHospital(e.target.value);
    }, []);

    const [pickup, setPickup] = useState('');
    const onChanagePickup = useCallback((e) => {
        e.preventDefault();
        setPickup(e.target.value);
    }, []);

    const [content, setContent] = useState('');
    const onChanageContent = useCallback((e) => {
        e.preventDefault();
        setContent(e.target.value);
    }, []);

    const [message, setMessage] = useState('');
    const onChanageMessage = useCallback((e) => {
        e.preventDefault();
        setMessage(e.target.value);
    }, []);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const data: OrderReq = {
                hospital,
                hours,
                pickup,
                content,
                message,
                serviceId: service._id,
                state: 'apply',
                date: new Date().toDateString(),
                time: 'am',
                totalPayment: hours * service.wage,
            };
            dispatch(addOrderRequest(data));
        },
        [hospital, hours, pickup, content, message, service._id, service.wage, dispatch],
    );

    const [showModal, setShowModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setShowModal(false);
        console.log('clicked!');
    }, []);

    // POST notification
    useEffect(() => {
        if (orderInfo && addOrderDone) {
            const notification = {
                recipient: service.assistant._id,
                subject: orderInfo._id,
                clientUrl: `/service/accept/${orderInfo._id}`,
                content: '새로운 서비스 신청 1건이 있습니다',
            };
            dispatch(addNotificationRequest(notification));
            console.log('notification sent!');
        }
    }, [dispatch, service.assistant._id, orderInfo, addOrderDone]);

    useEffect(() => {
        if (addNotificationDone) {
            setShowModal(true);
            console.log('modal open!');
        }
    }, [addNotificationDone]);

    return (
        <Wrapper>
            <Title>
                <Link href={`../detail/${service._id}`}>
                    <i className="material-icons">chevron_left</i>
                </Link>

                <h1>서비스 신청하기</h1>
            </Title>
            <FormWrapper onSubmit={onSubmit}>
                <h4>방문하실 병원은 어디인가요?</h4>
                <InputWrapper>
                    <input
                        name="destination"
                        type="text"
                        placeholder="ex) 강남세브란스병원"
                        required
                        onChange={onChanageDestination}
                    />
                </InputWrapper>
                <h4>정확한 픽업 위치와 시간을 알려주세요</h4>
                <InputWrapper>
                    <input
                        name="pickup-info"
                        type="text"
                        placeholder="ex) 서울시 서초구 서운로 62 래미안리더스원 아파트 정문  / 오전 9시"
                        required
                        onChange={onChanagePickup}
                    />
                </InputWrapper>
                <h4>어떤 서비스가 필요한지 말씀해 주세요</h4>
                <InputWrapper>
                    <input
                        name="service-content"
                        type="text"
                        placeholder="ex) 진료실 동행, 병원 내에서 휠체어로 동행 등"
                        required
                        onChange={onChanageContent}
                    />
                </InputWrapper>
                <h4>
                    소요 시간 <span>(최소 1시간 - 모든 이동시간 포함)</span>
                </h4>
                <RadioWrapper onChange={onChangehours}>
                    <label className="container">
                        <input type="radio" name="service-hours" value="1" />
                        <span className="checkmark">1</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-hours" value="2" />
                        <span className="checkmark">2</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-hours" value="3" />
                        <span className="checkmark">3</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-hours" value="4" />
                        <span className="checkmark">4</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-hours" value="5" />
                        <span className="checkmark">5</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-hours" value="6" />
                        <span className="checkmark">6</span>
                    </label>
                </RadioWrapper>
                <h4>
                    어시스턴트가 참고할 만한 메시지를 남겨주세요
                    <br />
                    <span>메시지를 자세히 남길수록 매칭확률이 올라가요!</span>
                </h4>
                <TextareaWrapper>
                    <textarea
                        name="message"
                        placeholder="ex) 거동이 불편하셔서 휠체어를 동반해야 합니다, 진료 내용은 보호자에게 전달이 필요해요 등"
                        required
                        onChange={onChanageMessage}
                    />
                </TextareaWrapper>
                <ActionButton>신청하기</ActionButton>
            </FormWrapper>
            <Link href="/home">
                <CancelButton>취소하기</CancelButton>
            </Link>
            {showModal && addOrderDone && (
                <ResultModal
                    onClose={onCloseModal}
                    title="서비스 신청하기"
                    message="서비스 신청에 성공했습니다."
                    redirection="home"
                />
            )}
            {(showModal && addOrderError) ||
                (showModal && !me && (
                    <ResultModal
                        onClose={onCloseModal}
                        title="서비스 신청하기"
                        message="로그인이 필요합니다"
                        redirection="signin"
                    />
                ))}
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

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28rem;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-bottom: 2.5rem;
    input {
        width: 100%;
        border: none;
        border-bottom: 1px solid #e5e5e5;
        height: 3.125rem;
        margin: 0.8rem auto 0 auto;
        padding: 0.5rem;
    }
    input:focus {
        outline: none;
        border-bottom: 2px solid #68d480;
        font-size: 1rem;
    }
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

const RadioWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2.5rem;
    .container {
        display: block;
        position: relative;
        padding-left: 3rem;
        margin-bottom: 3rem;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        padding-top: 0.4rem;
        font-size: 1.1rem;
        height: 2.8rem;
        width: 2.8rem;
        background-color: #fff;
        border: 0.15rem solid #ccc;
        color: #c0c0c0;
        border-radius: 50%;
        text-align: center;
    }
    .container:hover input ~ .checkmark {
        border: 0.15rem solid #68d480;
        color: #68d480;
    }
    .container input:checked ~ .checkmark {
        background-color: #68d480;
        border: 0.15rem solid #68d480;
        color: #fff;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
`;

export default Reservation;
