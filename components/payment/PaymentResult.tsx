/* eslint-disable import/namespace */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CheckCircleTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ParsedUrlQuery } from 'querystring';
import { RootState } from '../../reducers';
import { ActionButton } from '../style/style';
import { addNotificationRequest } from '../../actions/notifications';

type Props = {
    result: ParsedUrlQuery;
};

const PaymentResult = ({ result }: Props) => {
    const router = useRouter();
    const { imp_uid, merchant_uid } = result;

    const dispatch = useDispatch();
    const { orderInfo } = useSelector((state: RootState) => state.order);
    const { checkoutStatus, checkoutError } = useSelector((state: RootState) => state.payment);
    const { addNotificationDone } = useSelector((state: RootState) => state.notifications);

    const order = orderInfo;

    const [checkoutErrorMsg, setCheckoutErrorMsg] = useState('');
    const [isSuccessed, setIsSuccessed] = useState(false);

    useEffect(() => {
        if (checkoutStatus === 'success') {
            setIsSuccessed(true);
        }
    }, [checkoutStatus]);

    useEffect(() => {
        if (checkoutError === `Request failed with status code 500`) {
            setCheckoutErrorMsg('결제를 취소했습니다');
        }
        if (checkoutError === `Request failed with status code 400`) {
            setCheckoutErrorMsg('결제 금액이 일치하지 않아 결제가 취소되었습니다');
        }
    }, [checkoutError]);

    // POST notification
    const sendNotification = useCallback(() => {
        if (orderInfo && !addNotificationDone) {
            const notification = {
                recipient: orderInfo.assistant._id,
                subject: orderInfo._id,
                clientUrl: `/assistant/center`,
                content: `${orderInfo.customer.name}님이 결제를 완료하셨습니다.`,
            };
            dispatch(addNotificationRequest(notification));
            router.push('/');
        }
    }, [addNotificationDone, dispatch, orderInfo, router]);

    const resultType = isSuccessed ? '성공' : '실패';
    return (
        <>
            {order ? (
                <Wrapper>
                    {isSuccessed ? (
                        <CheckCircleTwoTone twoToneColor="#68d480" />
                    ) : (
                        <ExclamationCircleOutlined twoToneColor="#db454c" />
                    )}
                    <p>{`결제에 ${resultType}하였습니다`}</p>
                    <ul>
                        <li>
                            <span>주문명</span>
                            <span>{`${order.assistant.name} 어시스턴트의 동행 서비스`}</span>
                        </li>
                        <li>
                            <span>주문번호</span>
                            <span>{merchant_uid}</span>
                        </li>
                        {isSuccessed ? (
                            <>
                                <li>
                                    <span>아임포트 번호</span>
                                    <span>{imp_uid}</span>
                                </li>
                                <li>
                                    <span>어시스턴트 연락처</span>
                                    <span>{order.assistant.mobile}</span>
                                </li>
                            </>
                        ) : (
                            <li>
                                <span>실패 메시지</span>
                                <span>{checkoutErrorMsg}</span>
                            </li>
                        )}
                    </ul>
                    <Button onClick={sendNotification}>메인으로 돌아가기</Button>
                </Wrapper>
            ) : (
                <div style={{ fontSize: '1rem', marginTop: '25%' }}>불러오는 중입니다...</div>
            )}
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;
    padding: 2rem;

    > .anticon {
        font-size: 7rem;
        text-align: center;
        margin-bottom: 2rem;
    }

    p {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    ul {
        list-style: none;
        padding: 0;
        margin-bottom: 3rem;

        li {
            display: flex;
            line-height: 2;
            span:first-child {
                width: 8rem;
                color: #888;
            }
            span:last-child {
                width: calc(100% - 8rem);
                color: #333;
            }
        }
    }
`;

const Button = styled(ActionButton)`
    color: #fff;
    font-size: 1rem;
    width: 21rem;
`;

export default PaymentResult;
