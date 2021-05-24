/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ServiceCard from './ServiceCard';

const TotalSection = ({ title }) => {
    const { totalService, searchService } = useSelector((state) => state.service);

    return (
        <Wrapper>
            <Header>{title}</Header>
            <Row style={{ overflow: 'hidden' }}>
                {title === '검색 결과'
                    ? searchService.map((ele) => (
                          <Col key={ele._id} xs={24} sm={12} md={8} lg={6} span={24}>
                              <ServiceCard service={ele} />
                          </Col>
                      ))
                    : totalService.map((ele) => (
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

TotalSection.propTypes = {
    title: PropTypes.string.isRequired,
};
export default TotalSection;
