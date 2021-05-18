import Link from 'next/link';
import styled from 'styled-components';
import useIsInViewport from 'use-is-in-viewport';

const Section2 = () => {
    const [isInViewport, targetRef] = useIsInViewport();
    return (
        <>
            <Wrapper ref={targetRef} className={isInViewport ? 'visible' : 'hidden'}>
                <MainBox>
                    <Image src="/images/landing2.jpg" />
                    <MainText>
                        <h1>
                            매번 챙겨드릴 수 없다면, <br />이 곳에서 <span>도움</span>을 받으세요.
                        </h1>
                        <p>
                            WISE는 병원을 방문해야 하는 시니어분들과 <br /> 그들의 보호자인 자식들의 걱정을 덜어줄
                            <br />
                            <span>병원 동행 서비스</span>입니다.
                        </p>
                    </MainText>
                </MainBox>
                <Banner>
                    <AssistBanner src="/images/landing-banner.png" alt="landing page banner" />
                    <BannerText>
                        <SmallText>
                            <h2>교육을 이수한 후, 어시스턴트로도 활동해 보세요.</h2>
                            <p>도움이 필요한 사람들과의 매칭을 도와드릴게요.</p>
                        </SmallText>
                        <Link href="/signin">
                            <RegisterBtn> 어시스턴트 등록하기 </RegisterBtn>
                        </Link>
                    </BannerText>
                </Banner>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 140vh;
`;

const Image = styled.img`
    margin: 15rem 0 0 5rem;
    width: 42vw;
    object-fit: cover;
`;

const MainText = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10%;
    width: 28rem;
    color: #222;
    h1 {
        font-size: 2.6rem;
        span {
            color: #68d480;
        }
    }
    p {
        font-size: 1.1rem;
        text-align: right;
        padding-right: 1.6rem;
        span {
            color: #68d480;
            font-weight: 500;
        }
    }
`;

const MainBox = styled.div`
    display: flex;
    flex-direction: row;
    flex: 6 1 0;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`;

const Banner = styled.div`
    flex: 2 1 0;
    width: 100%;
`;

const AssistBanner = styled.img`
    width: 100%;
    height: 14rem;
    z-index: -1;
    position: absolute;
`;

const BannerText = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 14rem;
    width: 100%;
    position: absolute;
`;

const SmallText = styled.div`
    color: #fff;
`;

const RegisterBtn = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -20%;
    height: 3.6rem;
    width: 14rem;
    color: #68d480;
    font-weight: 500;
    font-size: 1.2rem;
    border: 1px solid #68d480;
    background-color: #fff;
    border-radius: 3rem;
    box-shadow: 0.1rem 0.1rem 0.3rem #647c6b;
    cursor: pointer;
`;

export default Section2;
