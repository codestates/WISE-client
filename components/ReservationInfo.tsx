import styled from 'styled-components';
import { Order } from '../interfaces/data/service';

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
    margin-bottom: 3rem;
    border: 1px solid #f0f0f0;
    border-radius: 0.4rem;
    box-shadow: 0.2rem 0.1rem 0.4rem #ddd;
`;

export default ReservationInfo;
