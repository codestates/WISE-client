/* eslint-disable no-underscore-dangle */
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ServiceCard from './ServiceCard';
import { ShortService } from '../../interfaces/data/service';
import { RootState } from '../../reducers';

type TotalSectionProps = {
    title: string;
    searchQuery: { date: string; location: string; page: number; time: string };
};

const TotalSection = ({ title, searchQuery }: TotalSectionProps) => {
    const { totalServices, searchServices } = useSelector((state: RootState) => state.service);

    return (
        <Wrapper>
            <Header>{title}</Header>
            <Row style={{ overflow: 'hidden' }}>
                {title === '검색 결과'
                    ? searchServices.map((ele: ShortService) => (
                          <Col key={ele._id} xs={24} sm={12} md={8} lg={6} span={24}>
                              <ServiceCard service={ele} searchQuery={searchQuery} />
                          </Col>
                      ))
                    : totalServices.map((ele: ShortService) => (
                          <Col key={ele._id} xs={24} sm={12} md={8} lg={6} span={24}>
                              <ServiceCard service={ele} />
                          </Col>
                      ))}
            </Row>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    h2 {
        font-weight: bolder;
    }
`;

const Header = styled.div`
    // border: 1px solid black;
    font-weight: bolder;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
`;

export default TotalSection;
