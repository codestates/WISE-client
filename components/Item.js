import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import { useSelector, useDispatch } from 'react-redux';

const Item = ({ name }) => {
    // const { serviceId } = useSelector((state) => state.service);
    // const dispatch = useDispatch();

    return (
        <Wrapper>
            {/* <Link href="/users/[id]" as={`/users/${serviceId}`}> */}
            <Link href="/service/detail/id">
                <a>
                    <Container>
                        <img
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            alt="샘플이미지"
                        />
                        <div>
                            <div>
                                {name} <span>서울시 동작구</span>
                            </div>
                            <div>안전하고 편안하게 동행해드릴게요</div>
                            <h4>17,000원 / 시간</h4>
                        </div>
                    </Container>
                </a>
            </Link>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: inline-block;
    margin-right: 3rem;
    flex-shrink: 0;
`;

const Container = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15rem;
    height: 14rem;
    margin-bottom: 3rem;
    span {
        color: #888;
        font-size: 0.5rem;
    }
`;

Item.propTypes = {
    name: PropTypes.string,
};

Item.defaultProps = {
    name: '김천사',
};

export default Item;
