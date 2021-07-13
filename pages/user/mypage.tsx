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
                <NavTap tap={tap}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>마이페이지</div>
                    <Nav>
                        <div className="tap1" onClick={() => onClickTap(1)}>
                            주문 현황
                        </div>
                        <div className="tap2" onClick={() => onClickTap(2)}>
                            매칭 완료
                        </div>
                        <div className="tap3" onClick={() => onClickTap(3)}>
                            결제 내역
                        </div>
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
                    {tap === 2 && <AssistantList title="매칭 완료된 어시스턴트 목록" orders={customerCompleteOrders} />}
                    {tap === 3 && <PaymentDetails orders={customerCompleteOrders} />}
                    {tap === 4 && <ProfileModify />}
                </Tap>
                <Responsive>
                    <UserInfo>
                        {me &&
                            (me.image ? (
                                <Avatar src={process.env.NEXT_PUBLIC_imageURL + me.image} alt="avatar" />
                            ) : (
                                <Avatar src="/images/avatar_default.png" alt="avatar" />
                            ))}
                        <span style={{ marginTop: '5.3%' }}>
                            <div className="userName">{me?.name}</div>
                            <div className="userEmail">{me?.email}</div>
                        </span>
                    </UserInfo>
                    <div
                        style={{
                            borderTop: '1px solid #c9c9c9',
                            marginTop: '2%',
                            marginBottom: '4.5%',
                        }}
                    />
                    <ResponsiveNav tap={tap}>
                        <div className="tap1" onClick={() => onClickTap(1)}>
                            주문 현황
                        </div>
                        <div className="tap2" onClick={() => onClickTap(2)}>
                            매칭 완료
                        </div>
                        <div className="tap3" onClick={() => onClickTap(3)}>
                            결제 내역
                        </div>
                        <div className="profile" onClick={() => onClickTap(4)}>
                            프로필 업데이트&nbsp;&nbsp;
                            <SettingOutlined />
                        </div>
                    </ResponsiveNav>
                    <ResponsiveTap>
                        {tap === 1 && <AssistantList title="나의 주문 목록" orders={customerProgressOrders} />}
                        {tap === 2 && (
                            <AssistantList title="매칭 완료된 어시스턴트 목록" orders={customerCompleteOrders} />
                        )}
                        {tap === 3 && <PaymentDetails orders={customerCompleteOrders} />}
                        {tap === 4 && <ProfileModify />}
                    </ResponsiveTap>
                </Responsive>
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

const ResponsiveTap = styled.div`
    padding: 3rem 0;
    flex-grow: 1;
    @media screen and (max-width: 430px) {
        font-size: 0.8rem;
    }
    @media ${(props) => props.theme.mobile} {
        padding: 3rem 1rem;
    }
`;

const ResponsiveNav = styled.div<{ tap?: number }>`
    display: flex;
    justify-content: space-around;
    div {
        font-size: 1rem;
        cursor: pointer;
        @media screen and (max-width: 465px) {
            font-size: 0.8rem;
        }
    }
    .tap1 {
        color: ${(props) => (props.tap === 1 ? '#68d480' : '#000000')};
    }
    .tap2 {
        color: ${(props) => (props.tap === 2 ? '#68d480' : '#000000')};
    }
    .tap3 {
        color: ${(props) => (props.tap === 3 ? '#68d480' : '#000000')};
    }
    .profile {
        color: ${(props) => (props.tap === 4 ? '#68d480' : '#000000')};
    }
`;

const Avatar = styled.img`
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #d2d2d2;
    height: 4rem;
    width: 4rem;
    margin-left: 6.5%;
    margin-top: 5.3%;
    margin-right: 3%;

    @media ${(props) => props.theme.mobile} {
        margin-left: 4%;
        margin-top: 5.3%;
        margin-right: 6%;
    }
`;

const Wrapper = styled.div`
    width: 100vw;
    padding: 24px;
    max-width: 1248px;
    display: flex;
`;

const NavTap = styled.div<{ tap?: number }>`
    padding: 2.8rem;
    min-width: 250px;
    max-height: 560px;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tap1 {
        color: ${(props) => (props.tap === 1 ? '#68d480' : '#707070')};
    }
    .tap2 {
        color: ${(props) => (props.tap === 2 ? '#68d480' : '#707070')};
    }
    .tap3 {
        color: ${(props) => (props.tap === 3 ? '#68d480' : '#707070')};
    }
    .profile {
        color: ${(props) => (props.tap === 4 ? '#68d480' : '#000000')};
    }
    @media ${(props) => props.theme.mobile} {
        display: none;
    }
`;

const Tap = styled.div`
    margin-top: 3rem;
    padding: 4rem 0;
    max-width: 80%;
    width: 100%;
    @media ${(props) => props.theme.mobile} {
        display: none;
    }
`;

const UserInfo = styled.div`
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
    @media ${(props) => props.theme.mobile} {
        display: flex;
        .userName {
            font-size: 1.45rem;
        }
        .userEmail {
            font-size: 1rem;
        }
    }
`;

const Nav = styled.div`
    display: flex;
    flex-direction: column;
    div {
        margin-bottom: 20px;
        cursor: pointer;
    }
`;

const Responsive = styled.div`
    width: 100%;
    @media screen and (min-width: 640px) {
        display: none;
    }
`;

export default Mypage;
