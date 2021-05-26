import styled from 'styled-components';

const FAQ = (): JSX.Element => (
    <>
        <Wrapper id="faq">
            <Title>자주 묻는 질문</Title>
            <Question>Q. 서비스 신청 후 절차가 어떻게 되나요? </Question>
            <Text>
                예약 접수가 완료되면, 어시스턴트는 예약 알림을 받고 수락 여부를 결정하게 됩니다.
                <br /> 이후 어시스턴트가 예약을 수락하면 고객님께 ‘결제 요청’ 알림이 가고, 고객님께서 결제를 완료하시면
                최종 ‘매칭’이 이루어집니다. <br /> 이후 예약 일정에 맞춰 어시스턴트와 함께 병원에 방문하시면 됩니다.{' '}
                <br />
                고객님께서 결제를 취소하시면 처음 단계로 돌아가 다른 어시스턴트의 접수를 대기하게 됩니다.
            </Text>
            <Question>Q. 어시스턴트의 신원은 확실한가요? </Question>
            <Text>
                WISE는 누구나 어시스턴트가 될 수 있지만, 그와 동시에 적합한 교육이수를 거쳐야만 완전히 등록이 가능하도록
                되어있습니다.
                <br />
                나아가, 영업 배상 책임 보험 가입을 저희 서비스에서 자체적으로 실시하고 있습니다. <br />그 밖에
                어시스턴트가 개인적으로 발급받은 다양한 기관인증서를 저희가 수집하고 있기 때문에 <br />
                직접 눈으로 확인하시고 가장 믿음직한 어시스턴트를 선택하실 수 있습니다.
            </Text>
            <Question>Q. 예약 장소에서 담당 어시스턴트를 어떻게 찾나요? </Question>
            <Text>
                예약 접수 후 어시스턴트와의 매칭이 완료되면 ‘마이페이지’ 내에서 어시스턴트 연락처 및 기타 정보를
                확인하실 수 있으며, <br />
                해당 정보를 통해 어시스턴트와 서비스 관련 소통을 진행하시면 됩니다.
            </Text>
        </Wrapper>
    </>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #333;
    width: 100%;
`;

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    margin: 2rem;
`;

const Question = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    margin: 1rem 2rem;
`;

const Text = styled.div`
    padding: 1rem 2rem;
`;

export default FAQ;
