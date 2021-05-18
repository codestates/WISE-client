import styled from 'styled-components';
import useIsInViewport from 'use-is-in-viewport';

const Section2 = () => {
    const [isInViewport, targetRef] = useIsInViewport();

    return (
        <Wrapper ref={targetRef} className={isInViewport ? 'visible' : 'hidden'}>
            <CoverImg src="/images/landing3.jpg" />
            <Main>
                <Text>WISE 이용 후기</Text>
                <ReviewBox>
                    <Review>
                        <h3>나필요님</h3>
                        <p>
                            매번 챙겨드릴 수 없다면, 이 곳에서 도움을 받으세요. <br />
                            <br />
                            WISE는 병원을 방문해야 하는 시니어분들과 그들의 보호자인 자식들의 걱정을 덜어줄 병원 동행
                            서비스입니다.
                            <br />
                            <br />
                            강추강추!
                        </p>
                    </Review>
                    <Review>
                        <h3>김부탁님</h3>
                        <p>
                            매번 챙겨드릴 수 없다면, 이 곳에서 도움을 받으세요. <br />
                            <br />
                            WISE는 병원을 방문해야 하는 시니어분들과 그들의 보호자인 자식들의 걱정을 덜어줄 병원 동행
                            서비스입니다.
                            <br />
                            <br />
                            진짜 추천드려요~~
                        </p>
                    </Review>
                    <Review>
                        <h3>양땡큐님</h3>
                        <p>
                            매번 챙겨드릴 수 없다면, 이 곳에서 도움을 받으세요. <br />
                            <br />
                            WISE는 병원을 방문해야 하는 시니어분들과 그들의 보호자인 자식들의 걱정을 덜어줄 병원 동행
                            서비스입니다.
                            <br />
                            <br />
                            일단 한 번 써보세요.
                        </p>
                    </Review>
                </ReviewBox>
            </Main>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 140vh;
`;

const CoverImg = styled.img`
    width: 100%;
    height: 140vh;
    object-fit: cover;
    position: absolute;
    z-index: -1;
`;

const Text = styled.h1`
    position: absolute;
    margin-top: -2%;
    padding: 0 2rem;
    color: #222;
    background-color: #fff;
    font-size: 2.6rem;
    font-weight: 600;
`;

const ReviewBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    border: 0.3rem solid #68d480;
    border-radius: 1.4rem;
    width: 70%;
    height: 34rem;
    color: #222;
`;

const Review = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 1rem;
    height: 20rem;
    width: 16rem;
    margin: 0 1rem;
    box-shadow: 0.2rem 0.5rem 0.6rem #ddd;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

export default Section2;
