/* eslint-disable camelcase */
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { CheckCircleTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ParsedUrlQuery } from 'querystring';
import { checkoutRequest } from '../actions/service';
import { Order } from '../interfaces/data/service';
import { RootState } from '../reducers';
import { ActionButton } from './button-style';

type Props = {
    result: ParsedUrlQuery;
    order: Order;
    accessToken: string;
};

const PaymentResult = ({ result, order, accessToken }: Props) => {
    console.log(result);
    const { merchant_uid, imp_uid } = result;

    const router = useRouter();
    const dispatch = useDispatch();
    const { checkoutStatus, checkoutError } = useSelector((state: RootState) => state.service);

    const [isSuccessed, setIsSuccessed] = useState(false);

    // 결제금액이 위변조되지는 않았는지 확인하고나서 결제 성공 여부를 결정하기 위해 서버에 요청을 날림
    const handleRequestResult = useCallback(() => {
        dispatch(checkoutRequest(order.id, imp_uid, accessToken));
    }, [order.id, imp_uid, accessToken, dispatch]);

    useEffect(() => {
        handleRequestResult();
    }, [handleRequestResult]);

    useEffect(() => {
        if (checkoutStatus === 'success') {
            setIsSuccessed(true);
        }
    }, [checkoutStatus]);

    const resultType = isSuccessed ? '성공' : '실패';
    return (
        <Wrapper>
            {isSuccessed ? (
                <CheckCircleTwoTone twoToneColor="#68d480" />
            ) : (
                <ExclamationCircleOutlined twoToneColor="#db454c" />
            )}
            <p>{`결제에 ${resultType}하였습니다`}</p>
            <ul>
                <li>
                    <span>주문번호</span>
                    <span>{merchant_uid}</span>
                </li>
                {isSuccessed ? (
                    <li>
                        <span>아임포트 번호</span>
                        <span>{imp_uid}</span>
                    </li>
                ) : (
                    <li>
                        <span>실패 메시지</span>
                        <span>{checkoutError}</span>
                    </li>
                )}
            </ul>
            <Button onClick={() => router.push('/')}>메인으로 돌아가기</Button>
        </Wrapper>
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

    button:hover {
        opacity: 0.7;
    }
`;

const Button = styled(ActionButton)`
    color: #51885d;
    font-size: 1rem;
    width: 21rem;
    &:hover {
        color: #7ab387;
    }
`;

export default PaymentResult;
