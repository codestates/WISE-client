import styled from 'styled-components';

const Navigation = () => (
    <>
        <Wrapper>
            <a href="#description">어시스턴트 소개</a>
            <a href="#review">후기</a>
            <a href="#faq">자주 묻는 질문</a>
            <a href="#refund">환불 정책</a>
        </Wrapper>
        <Divide />
    </>
);

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 4rem;
    width: 60%;
    color: #555;
    position: sticky;
    width: 100%;
    a {
        font-size: 0.9rem;
        &:hover {
            color: #68d480;
        }
    }
`;

const Divide = styled.div`
    border-top: 1px solid #ddd;
    margin-bottom: 1rem;
`;

export default Navigation;
