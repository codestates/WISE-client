/* eslint-disable react/require-default-props */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ServiceCard from './ServiceCard';
import { ShortService } from '../../interfaces/data/service';
import { RootState } from '../../reducers';

type ServiceSectionProps = {
    title: string;
    searchQuery?: { date: string; location: string; page: number; time: string };
};

const ServiceSection = ({ title, searchQuery }: ServiceSectionProps) => {
    const { totalServices, searchServices, loadSearchServicesDone } = useSelector((state: RootState) => state.service);

    return (
        <>
            <Header>
                {title}
                <div style={{ marginTop: '10px', fontSize: '16px', color: '#999' }}>
                    {searchQuery && `${searchQuery?.location} | ${searchQuery?.date} | ${searchQuery?.time}`}
                </div>
            </Header>
            <Wrapper>
                {title === '전체 어시스턴트' &&
                    totalServices.map((ele: ShortService) => <ServiceCard key={ele._id} service={ele} />)}
                {title === '검색 결과' &&
                    (searchServices.length > 0 ? (
                        <>
                            {searchServices.map((ele: ShortService) => (
                                <ServiceCard key={ele._id} service={ele} searchQuery={searchQuery} />
                            ))}
                        </>
                    ) : (
                        <>{loadSearchServicesDone && <div>검색결과가 없습니다.</div>}</>
                    ))}
            </Wrapper>
        </>
    );
};
const Header = styled.div`
    font-weight: bolder;
    font-size: 1.4rem;
    height: 2.5rem;
    margin-bottom: 2rem;
`;

const Wrapper = styled.div`
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

export default ServiceSection;
