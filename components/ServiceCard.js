/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import Link from 'next/link';
// import { useSelector, useDispatch } from 'react-redux';

const ServiceCard = ({ service }) => {
    // const { serviceId } = useSelector((state) => state.service);
    // const dispatch = useDispatch();
    // console.log('service : ', service);

    return (
        <Wrapper>
            <Link href="/service/detail/[id]" as={`/service/detail/${service._id}`}>
                <a>
                    <Container>
                        <img src={process.env.NEXT_PUBLIC_imageURL + service.images[0]} alt="샘플이미지" />
                        <div>
                            <div>
                                {service.assistant.name} <span>{service.location}</span>
                            </div>
                            <div>{service.greetings}</div>
                            <h4>{service.wage}원 / 시간</h4>
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
    cursor: pointer;
`;

export default ServiceCard;
