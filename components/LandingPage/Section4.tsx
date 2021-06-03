import Link from 'next/link';
import styled from 'styled-components';
import useIsInViewport from 'use-is-in-viewport';

const Section2 = () => {
    const [isInViewport, targetRef] = useIsInViewport();

    return (
        <Wrapper ref={targetRef} className={isInViewport ? 'visible' : 'hidden'}>
            <MainBox>
                <Text>
                    <h1>이제 마음껏 사용해보세요!</h1>
                    <Link href="/home">
                        <StartBtn>시작하기</StartBtn>
                    </Link>
                </Text>
                <Image src="/images/landing4.png" />
            </MainBox>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120vh;
    transition: transform 1s, opacity 1s;

    @media ${(props) => props.theme.mobile} {
        height: 80vh;
    }
`;

const Text = styled.div`
    flex: 4 1 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
        font-size: 2.4rem;
        color: #222;
        margin-bottom: 2rem;
    }

    @media ${(props) => props.theme.tablet} {
        h1 {
            font-size: 2rem;
        }
    }
    @media ${(props) => props.theme.mobile} {
        h1 {
            font-size: 1.6rem;
        }
    }
`;

const Image = styled.img`
    flex: 6 1 0;
    width: 80%;
    position: relative;
    object-fit: contain;
    bottom: 0;
    @media ${(props) => props.theme.mobile} {
        bottom: 10%;
    }
`;

const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 7 1 0;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`;

const StartBtn = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 500;
    font-size: 1.4rem;
    background-color: #68d480;
    border-radius: 3rem;
    height: 3.8rem;
    width: 16rem;
    box-shadow: 0.1rem 0.1rem 0.3rem #b8b8b8;
    cursor: pointer;

    @media ${(props) => props.theme.mobile} {
        height: 3rem;
        width: 14rem;
    }
`;

export default Section2;
