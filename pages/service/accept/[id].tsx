import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import Layout from '../../../components/Layout';
import AcceptOrder from '../../../components/AcceptOrder';
import { GET_RESERVATION_INFO_REQUEST } from '../../../interfaces/act/service';
import wrapper from '../../../store/configureStore';
import { RootState } from '../../../reducers';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
`;

const ReservationAccept = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const { getReservationInfo } = useSelector((state: RootState) => state.service);
    console.log(getReservationInfo);

    return (
        <Layout title="Reservation accept">
            <>
                <Global />
                {getReservationInfo ? (
                    <Wrapper>
                        <h2>서비스 요청을 자세히 확인해주세요!</h2>
                        <AcceptOrder reservationInfo={getReservationInfo} orderId={id} />
                    </Wrapper>
                ) : (
                    <BadRequest>
                        <ExclamationCircleOutlined />
                        <h2>존재하지 않는 요청입니다 :(</h2>
                    </BadRequest>
                )}
            </>
        </Layout>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3rem;
    h2 {
        text-align: center;
        font-weight: 700;
    }
`;

const BadRequest = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
    > .anticon {
        font-size: 5rem;
        text-align: center;
        margin-bottom: 2rem;
        color: #db454c;
    }
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const { accessToken } = useSelector((state: RootState) => state.user);

    context.store.dispatch({
        type: GET_RESERVATION_INFO_REQUEST,
        orderId: context.params?.id,
        accessToken,
    });

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
});

export default ReservationAccept;
