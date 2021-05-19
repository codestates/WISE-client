import styled from 'styled-components';
import PropTypes from 'prop-types';

const Description = ({ service }) => (
    <>
        <Wrapper id="description">
            <Title>김천사 어시스턴트는 이런 사람이에요</Title>
            <Badges>
                {service.isDriver ? (
                    <span>
                        <ImgCon>
                            <img src="/images/isDriver.png" alt="운전가능" />
                        </ImgCon>
                        <div>운전가능</div>
                    </span>
                ) : (
                    ''
                )}
                {service.isTrained ? (
                    <span>
                        <ImgCon>
                            <img src="/images/isEducated.png" alt="교육이수" />
                        </ImgCon>
                        <div>교육이수</div>
                    </span>
                ) : (
                    ''
                )}
                {service.isAuthorized ? (
                    <span>
                        <ImgCon>
                            <img src="/images/orgAuth.png" alt="기관인증" />
                        </ImgCon>
                        <div>기관인증</div>
                    </span>
                ) : (
                    ''
                )}
            </Badges>
            <Text>{service.description}</Text>
        </Wrapper>
    </>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 60%;
    color: #555;
    width: 100%;
`;

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    margin: 2rem;
`;

const Badges = styled.div`
    display: flex;
    img {
        width: 2.8rem;
    }
    span {
        margin: 0 2rem;
    }
    div {
        margin-bottom: 1rem;
        text-align: center;
        color: #777;
        font-weight: 500;
    }
`;

const ImgCon = styled.div`
    padding: 0.8rem;
    border: 2px solid #68d480;
    border-radius: 4rem;
`;

const Text = styled.div`
    padding: 2rem;
`;

Description.propTypes = {
    service: PropTypes.object.isRequired,
};

export default Description;
