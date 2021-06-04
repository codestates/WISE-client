import styled from 'styled-components';
import { Order } from '../../interfaces/data/order';

type Props = {
    reservationInfo: Order;
};

const ReservationInfo = ({ reservationInfo }: Props) => (
    <DetailWrapper>
        <h3>서비스 상세 내용</h3>
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
);

const DetailWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28rem;
    padding: 2rem;
    margin-bottom: 1rem;
    h3 {
        padding-bottom: 0.5rem;
        font-size: 1.2rem;
        font-weight: 700;
        color: #54b86a;
    }
    h4 {
        font-size: 1rem;
        margin: 1.5rem 0 0.5rem;
        color: #555;
        font-weight: 600;
    }
    div {
        color: #424242;
        font-size: 1rem;
        background: rgba(84, 184, 105, 0.3);
        padding: 1rem 1.5rem;
        border-radius: 1rem;
        font-weight: 500;
    }

    @media ${(props) => props.theme.tablet} {
        margin: 0 auto;
        padding: 0;
        padding-bottom: 1rem;
        width: 60vw;
    }

    @media ${(props) => props.theme.mobile} {
        width: 80vw;
    }
`;

export default ReservationInfo;
