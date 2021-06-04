/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/dist/client/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import styled from 'styled-components';
import { loadNotificationsRequest } from '../../actions/notifications';
import { loadOrdersRequest } from '../../actions/order';
import { loadServiceRequest } from '../../actions/service';
import { loadProfileRequest } from '../../actions/user';
import AssistantModify from '../../components/Assistant/AssistantModify';
import OrderTable from '../../components/Assistant/OrderTable';
import PaymentDetails from '../../components/Assistant/PaymentDetails';
import Layout from '../../layout/Layout';
import { RootState } from '../../reducers';
import wrapper from '../../store/configureStore';

const Center = () => {
    const router = useRouter();
    const { me } = useSelector((state: RootState) => state.user);
    const { myService } = useSelector((state: RootState) => state.service);
    const { assistantApplyOrders, assistantAcceptOrders, assistantCompleteOrders } = useSelector(
        (state: RootState) => state.order,
    );
    const [tap, setTap] = useState(1);

    const onClickTap = (idx: number) => {
        setTap(idx);
    };

    useEffect(() => {
        if (!me) {
            router.push('/user/signin');
        }
    }, [router, me]);

    return (
        <Layout title="WISE | MYPAGE">
            <Wrapper>
                <NavTap tap={tap}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>어시스턴트 센터</div>
                    {myService && (
                        <img
                            style={{ width: '150px', height: '120px', borderRadius: '5px' }}
                            src={process.env.NEXT_PUBLIC_imageURL + myService.images[0]}
                            alt="assistantImg"
                        />
                    )}
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
                            어시스턴트 수정&nbsp;&nbsp;
                            <SettingOutlined />
                        </div>
                    </UserInfo>
                </NavTap>
                <Tap>
                    {tap === 1 && (
                        <>
                            <OrderTable title="수락 대기 중인 유저 목록" orders={assistantApplyOrders} />
                            <OrderTable title="결제 대기 중인 유저 목록" orders={assistantAcceptOrders} />
                        </>
                    )}
                    {tap === 2 && <OrderTable title="매칭 완료된 유저 목록" orders={assistantCompleteOrders} />}
                    {tap === 3 && <PaymentDetails orders={assistantCompleteOrders} />}
                    {tap === 4 && <AssistantModify />}
                </Tap>
                <Responsive>
                    <ResponsiveUserInfo>
                        {myService && (
                            <img
                                style={{ width: '60%', height: '32%', marginRight: '2.1rem', borderRadius: '5px' }}
                                src={process.env.NEXT_PUBLIC_imageURL + myService.images[0]}
                                alt="assistantImg"
                            />
                        )}

                        <UserInfo>
                            <div className="userName">{me?.name}</div>
                            <div className="userEmail">{me?.email}</div>
                            <div style={{ fontWeight: 500 }} className="greetings">
                                {myService?.greetings}
                            </div>
                        </UserInfo>
                    </ResponsiveUserInfo>
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
                            어시스턴트 수정&nbsp;&nbsp;
                            <SettingOutlined />
                        </div>
                    </ResponsiveNav>
                    <ResponsiveTap>
                        {tap === 1 && (
                            <>
                                <OrderTable title="수락 대기 중인 유저 목록" orders={assistantApplyOrders} />
                                <OrderTable title="결제 대기 중인 유저 목록" orders={assistantAcceptOrders} />
                            </>
                        )}
                        {tap === 2 && <OrderTable title="매칭 완료된 유저 목록" orders={assistantCompleteOrders} />}
                        {tap === 3 && <PaymentDetails orders={assistantCompleteOrders} />}
                        {tap === 4 && <AssistantModify />}
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
        context.store.dispatch(loadOrdersRequest('assistant', cookies.userId, cookies.token));
        context.store.dispatch(loadServiceRequest(cookies.serviceId));
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
    flexgrow: 1;
`;

const ResponsiveNav = styled.div`
    display: flex;
    justify-content: space-around;
    div {
        font-size: 1.1rem;
        font-weight: 500;
        cursor: pointer;
        @media screen and (max-width: 520px) {
            font-size: 0.9rem;
        }
        @media screen and (max-width: 520px) {
            font-size: 0.9rem;
        }
        @media screen and (max-width: 435px) {
            font-size: 0.8rem;
        }
    }
    margin-top: 2.6rem;
    margin-bottom: 2.6rem;
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

const ResponsiveUserInfo = styled.div`
    display: flex;
`;

const Responsive = styled.div`
    width: 100%;
    @media screen and (min-width: 640px) {
        display: none;
    }
`;

const Wrapper = styled.div`
    // border: 1px solid black;
    // padding: 3rem;
    width: 100vw;
    max-width: 1200px;
    display: flex;
    @media ${(props) => props.theme.mobile} {
        padding: 3.3rem;
        padding-top: 4rem;
    }
`;

const NavTap = styled.div`
    // border: 1px solid black;
    width: 250px;
    height: 60vh;
    padding: 3rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media ${(props) => props.theme.mobile} {
        display: none;
    }
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
`;

const Tap = styled.div`
    // border: 1px solid black;
    flex-grow: 1;
    margin: 3rem 0;
    @media ${(props) => props.theme.mobile} {
        display: none;
    }
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

export default Center;
