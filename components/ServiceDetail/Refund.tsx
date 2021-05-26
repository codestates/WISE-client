import styled from 'styled-components';

const Refund = () => (
    <>
        <Wrapper id="refund">
            <Title>환불 정책</Title>
            <Text>
                환불 정책에 따라 구매일로부터 일주일까지 환불 요청이 가능하며, 48시간 까지 전액 환불이 가능합니다.
            </Text>
            <Content>
                <div>
                    <h4>서비스 예약 날짜 기준 48시간 이내 변경 및 취소</h4>
                    <h4>서비스 예약 전날 18:00 이전 변경 및 취소 </h4>
                    <h4> 당일 예약 변경 및 취소 </h4>
                    <h4>서비스 시작 2시간 전 이내 변경 및 취소 </h4>
                    <h4> 노쇼(No-Show)의 경우 </h4>
                </div>
                <div>
                    <p> 수수료 없이 변경 & 취소 가능</p>
                    <p> 취소 시 수수료 10,000원 발생. 단, 어시스턴트와 변경 협의 성공 시에는 수수료 부과 X </p>
                    <p> 취소 시 수수료 15,000원 발생. 단, 어시스턴트와 변경 협의 성공 시에는 수수료 부과 X</p>
                    <p> 취소 시 수수료 20,000원 발생. 단, 어시스턴트와 변경 협의 성공 시에는 수수료 부과 X </p>
                    <p> 회원 자격 정지 및 민/형사상 책임 소지를 물을 수있음</p>
                </div>
            </Content>
        </Wrapper>
    </>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 60%;
    color: #333;
    width: 100%;
    padding: 2rem;
`;

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    margin-top: 2rem;
`;

const Text = styled.div`
    padding: 2rem 0;
`;

const Content = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    border: 1px solid #f0f0f0;
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.5rem 0.6rem #ddd;
    padding: 2rem 3rem;
    justify-items: center;
    background-color: #f1f1f1;
    h4 {
        color: #41c45d;
        font-size: 0.8rem;
        margin-bottom: 1rem;
    }
    p {
        padding-left: 1.6rem;
        padding-bottom: 0.4rem;
        font-size: 0.8rem;
    }
`;

export default Refund;
