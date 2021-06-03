/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ServiceCard from './ServiceCard';
import { ShortService } from '../../interfaces/data/service';
import { RootState } from '../../reducers';

type SearchSectionProps = {
    title: string;
    searchQuery?: { date: string; location: string; page: number; time: string };
};

const SearchSection = ({ title, searchQuery }: SearchSectionProps) => {
    const { searchServices } = useSelector((state: RootState) => state.service);

    return (
        <>
            <Header>
                {title}
                <div style={{ marginTop: '10px', fontSize: '16px', color: '#999' }}>
                    {searchQuery && `${searchQuery?.location} | ${searchQuery?.date} | ${searchQuery?.time}`}
                </div>
            </Header>
            <Wrapper>
                {searchServices.map((ele: ShortService) => (
                    <ServiceCard key={ele._id} service={ele} searchQuery={searchQuery} />
                ))}
            </Wrapper>
        </>
    );
};

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

const Header = styled.div`
    // border: 1px solid black;
    font-weight: bolder;
    font-size: 1.4rem;
    height: 2.5rem;
    margin-bottom: 4%;
`;

export default SearchSection;
