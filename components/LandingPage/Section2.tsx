import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';

const Section2 = (): ReactElement => (
    <Wrapper>
        <MainBox>
            <Image src="/images/landing2.jpg" />
            <Text>
                <h1>
                    매번 챙겨드릴 수 <br />
                    없다면, <br />
                    이 곳에서 도움을 <br />
                    받으세요.
                </h1>
                <p>
                    WISE는 병원을 방문해야 하는 시니어분들과 그들의 보호자인 자식들의 걱정을 덜어줄 병원 동행
                    서비스입니다.
                </p>
            </Text>
        </MainBox>
        <AssistBox>
            <h2>교육을 이수한 후, 어시스턴트로도 활동해 보세요.</h2>
            <p>도움이 필요한 사람들과의 매칭을 도와드릴게요.</p>
            <Link href="/signin">
                <RegisterBtn> 어시스턴트 등록하기 </RegisterBtn>
            </Link>
        </AssistBox>
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 140vh;
    transition: transform 1s, opacity 1s;
`;

const Image = styled.img`
    margin-right: 2rem;
    width: 42vw;
    object-fit: cover;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 8%;
    width: 20rem;
    color: #222;
    h1 {
        font-size: 2.6rem;
    }
    p {
        font-size: 1.1rem;
    }
`;

const MainBox = styled.div`
    display: flex;
    flex-direction: row;
    flex: 7 1 0;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`;

const AssistBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 2.5 1 0;
    height: 10rem;
    width: 100%;
    background-color: #a8dbb3;
    h2 {
        font-size: 1.6rem;
        color: #555;
        font-weight: 400;
    }
    p {
        color: #555;
    }
`;

const RegisterBtn = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    color: #fff;
    font-weight: 400;
    font-size: 1.2rem;
    background-color: #68d480;
    border-radius: 3rem;
    height: 2.8rem;
    width: 25rem;
    cursor: pointer;
`;

export default Section2;
