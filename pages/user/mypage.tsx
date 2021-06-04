/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SettingOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import styled from 'styled-components';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { loadNotificationsRequest } from '../../actions/notifications';
import { loadOrdersRequest } from '../../actions/order';
import { loadProfileRequest } from '../../actions/user';
import AssistantList from '../../components/Assistant/AssistantList';
import PaymentDetails from '../../components/Assistant/PaymentDetails';
import Loading from '../../components/Loading';
import ProfileModify from '../../components/ProfileModify';

import Layout from '../../layout/Layout';
import { RootState } from '../../reducers';
import wrapper from '../../store/configureStore';

const Mypage = () => {
    const router = useRouter();
    const { me } = useSelector((state: RootState) => state.user);
    const { customerProgressOrders, customerCompleteOrders } = useSelector((state: RootState) => state.order);
    const [tap, setTap] = useState(1);

    const onClickTap = useCallback((idx: number) => {
        setTap(idx);
    }, []);

    useEffect(() => {
        if (!me) {
            router.push('/user/signin');
        }
    }, [router, me]);

    return (
        <Layout title="WISE | MYPAGE">
            <Wrapper>
                <NavTap>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>마이페이지</div>
                    <Nav>
                        <div onClick={() => onClickTap(1)}>주문 현황</div>
                        <div onClick={() => onClickTap(2)}>매칭 완료</div>
                        <div onClick={() => onClickTap(3)}>결제 내역</div>
                    </Nav>
                    <UserInfo>
                        <div className="userName">{me?.name}</div>
                        <div className="userEmail">{me?.email}</div>
                        <div className="profile" onClick={() => onClickTap(4)}>
                            프로필 업데이트&nbsp;&nbsp;
                            <SettingOutlined />
                        </div>
                    </UserInfo>
                </NavTap>
                <Tap>
                    {tap === 1 && <AssistantList title="나의 주문 목록" orders={customerProgressOrders} />}
                    {tap === 2 && <AssistantList title="매칭 완료된 어시스턴트 목록" orders={customerProgressOrders} />}
                    {tap === 3 && <PaymentDetails orders={customerCompleteOrders} />}
                    {tap === 4 && <ProfileModify />}
                </Tap>
            </Wrapper>
        </Layout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookies = nookies.get(context);
    if (cookies.userId && cookies.token) {
        context.store.dispatch(loadProfileRequest(cookies.userId));
        context.store.dispatch(loadNotificationsRequest(cookies.userId, cookies.token));
        context.store.dispatch(loadOrdersRequest('customer', cookies.userId, cookies.token));
        context.store.dispatch(END);
        await context.store.sagaTask?.toPromise();
    } else {
        return {
            redirect: {
                permanent: false,
                destination: '/user/signin',
            },
        };
    }
});

const Wrapper = styled.div`
    // border: 1px solid black;
    // padding: 3rem;
    width: 100vw;
    height: 60vh;
    max-width: 1200px;
    display: flex;
`;

const NavTap = styled.div`
    // border: 1px solid black;
    width: 250px;
    padding: 3rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Tap = styled.div`
    // border: 1px solid black;
    margin-top: 3rem;
    padding: 3rem;
    flex-grow: 1;
`;

const UserInfo = styled.div`
    // border: 1px solid black;
    .userName {
        font-size: 1.5rem;
        font-weight: bold;
    }
    .userEmail {
        color: #a1a1a1;
        font-size: 0.875rem;
        margin-bottom: 20px;
    }
    .profile {
        cursor: pointer;
    }
    svg {
        font-size: 14px;
        color: #707070;
    }
`;

const Nav = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    div {
        color: #707070;
        margin-bottom: 20px;
        cursor: pointer;
    }
`;

export default Mypage;
