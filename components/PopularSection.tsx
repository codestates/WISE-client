import { Col, Row } from 'antd';
import styled from 'styled-components';
import Item from './Item';

const PopularSection = (): JSX.Element => {
    const tmp = [];
    const n = 8;
    for (let i = 0; i < n; i++) {
        tmp.push(i);
    }
    return (
        <Wrapper>
            <h2>인기있는 어시스턴트</h2>
            <Slider>
                <Row gutter={8}>
                    {tmp.map((ele) => (
                        <Col key={ele} xs={24} sm={12} md={8} lg={6} xl={4} xxl={3} span={24}>
                            <Item />
                        </Col>
                    ))}
                </Row>
            </Slider>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 3rem;
    h2 {
        font-weight: bolder;
    }
`;

const Slider = styled.div`
    border: 1px solid black;
`;

export default PopularSection;
