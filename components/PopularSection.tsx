import styled from 'styled-components';
import { useRef, useState } from 'react';
import Item from './Item';

const PopularSection = (): JSX.Element => {
    const responsive = {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 },
    };
    const items = [<Item key={1} />, <Item key={2} />, <Item key={3} />, <Item key={4} />, <Item key={5} />];

    const slider = useRef();
    const container = useRef();
    const [mainIndex, setMainIndex] = useState(0);
    const slideNext = () => {
        slider.current.style.transform = `translateX(-${(mainIndex + 1) * 288}px)`;
        setMainIndex(mainIndex + 1);
    };
    const slidePrev = () => {
        if (mainIndex > 0) {
            slider.current.style.transform = `translateX(-${(mainIndex - 1) * 288}px)`;
            setMainIndex(mainIndex - 1);
        }
    };
    console.log(slider.current.style);
    return (
        <Wrapper>
            <Header>인기있는 어시스턴트</Header>
            <PrevBtn onClick={slidePrev}>&lang;</PrevBtn>
            <Container ref={container}>
                <Slider ref={slider}>
                    <Item name="11" />
                    <Item name="22" />
                    <Item name="33" />
                    <Item name="44" />
                    <Item name="55" />
                    <Item name="66" />
                    <Item name="77" />
                </Slider>
            </Container>
            <NextBtn onClick={slideNext}>&rang;</NextBtn>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    height: 18rem;
    margin-bottom: 3rem;
    position: relative;
`;

const Header = styled.div`
    // border: 1px solid black;
    font-weight: bolder;
    font-size: 1.4rem;
    height: 2.5rem;
    margin-bottom: 1.5rem;
`;

const Container = styled.div`
    // border: 1px solid black;
    display: flex;
    position: relative;
    height: 14rem;
    overflow: hidden;
    box-sizing: border-box;
`;

const Slider = styled.div`
    position: absolute;
    white-space: nowrap;
    display: flex;
    height: 14rem;
    transition: all 0.3s ease-in-out;
`;

const PrevBtn = styled.div`
    position: absolute;
    top: 9rem;
    left: -2rem;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 5;
`;

const NextBtn = styled.div`
    position: absolute;
    top: 9rem;
    right: -2rem;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 5;
`;

export default PopularSection;
