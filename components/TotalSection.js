import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Item from './Item';

const TotalSection = ({ title }) => {
    const tmp = [];

    return (
        <Wrapper>
            <Header>{title}</Header>
            <Row style={{ overflow: 'hidden' }}>
                {tmp.map((ele) => (
                    <Col key={ele} xs={24} sm={12} md={8} lg={6} span={24}>
                        <Item />
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
    margin-bottom: 3rem;
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
