import { Row, Col } from 'antd';
import styled from 'styled-components';
import Item from './Item';

type TitleProps = {
    title: string;
};

const TotalSection = ({ title }: TitleProps): JSX.Element => {
    const tmp = [];
    const n = 50;
    for (let i = 0; i < n; i++) {
        tmp.push(i);
    }
    return (
        <Wrapper>
            <Header>{title}</Header>
            <Row style={{ overflow: 'hidden' }}>
                {tmp.map((ele) => (
                    <Col style={style} key={ele} xs={24} sm={12} md={8} lg={6} span={24}>
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
export default TotalSection;
