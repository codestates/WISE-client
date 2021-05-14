import { Row, Col } from 'antd';
import styled from 'styled-components';
import Item from './Item';

const TotalSection = ({ title }): JSX.Element => {
    const tmp = [];
    const n = 50;
    for (let i = 0; i < n; i++) {
        tmp.push(i);
    }
    return (
        <Wrapper>
            <h2>{title}</h2>
            <Row gutter={8}>
                {tmp.map((ele) => (
                    <Col key={ele} xs={24} sm={12} md={8} lg={6} xl={4} xxl={3} span={24}>
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
    justify-content: space-between;
    margin-bottom: 3rem;
    h2 {
        font-weight: bolder;
    }
`;

export default TotalSection;
