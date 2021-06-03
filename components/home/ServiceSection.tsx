/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ServiceCard from './ServiceCard';
import { ShortService } from '../../interfaces/data/service';
import { RootState } from '../../reducers';

const TotalSection = () => {
    const { totalServices } = useSelector((state: RootState) => state.service);

    return (
        <>
            <Header>전체 어시스턴트</Header>
            <Wrapper>
                {totalServices.map((ele: ShortService) => (
                    <ServiceCard key={ele._id} service={ele} />
                ))}
            </Wrapper>
        </>
    );
};
const Header = styled.div`
    // border: 1px solid black;
    font-weight: bolder;
    font-size: 2rem;
    height: 2.5rem;
    margin-bottom: 2.8rem;
`;

const Wrapper = styled.div`
    // border: 1px solid red;
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 20px;
    h2 {
        font-weight: bolder;
    }
    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export default TotalSection;
