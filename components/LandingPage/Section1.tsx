import Link from 'next/link';
import styled from 'styled-components';
import useIsInViewport from 'use-is-in-viewport';

const Section1 = () => {
    const [isInViewport, targetRef] = useIsInViewport();
    return (
        <Wrapper ref={targetRef} className={isInViewport ? 'visible' : 'hidden'}>
            <CoverImg src="/images/wise_bg.png" />
            <ResponsiveCoverImg src="/images/wise_mobile_bg.png" />
            <Text>
                <h1>
                    건강한 시니어 <br />
                    라이프를 위해
                </h1>
                <p>병원에 가실 땐 저희가 동행해 드릴게요.</p>
            </Text>
            <Link href="/home">
                <StartBtn>시작하기</StartBtn>
            </Link>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 110vh;
`;

const CoverImg = styled.img`
    width: 100%;
    height: 110vh;
    object-fit: cover;
    position: absolute;
    z-index: -1;

    @media ${(props) => props.theme.mobile} {
        display: none;
    }
`;

const ResponsiveCoverImg = styled.img`
    display: none;

    @media ${(props) => props.theme.mobile} {
        display: block;
        width: 100%;
        height: 110vh;
        object-fit: cover;
        position: absolute;
        z-index: -1;
    }
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    margin: 15rem 0 0 15%;
    color: #222;
    h1 {
        font-size: 3rem;
    }
    p {
        font-size: 1.3rem;
    }

    @media ${(props) => props.theme.mobile} {
        h1 {
            font-size: 2.5rem;
        }
        p {
            font-size: 1rem;
        }
    }
`;

const StartBtn = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 500;
    font-size: 1.2rem;
    background-color: #68d480;
    border-radius: 3rem;
    height: 2.8rem;
    width: 13rem;
    cursor: pointer;
    position: absolute;
    margin: 30rem 0 0 15%;

    @media ${(props) => props.theme.mobile} {
        margin: 0;
        left: 50%;
        top: 88%;
        transform: translate(-50%, -50%);
        width: 70vw;
        height: 3rem;
    }
`;

export default Section1;
