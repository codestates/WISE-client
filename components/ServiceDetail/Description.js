import styled from 'styled-components';

const Description = () => (
    <>
        <Wrapper id="description">
            <Title>김천사 어시스턴트는 이런 사람이에요</Title>
            <Badges>
                <span>
                    <ImgCon>
                        <img src="/images/isDriver.png" alt="운전가능" />
                    </ImgCon>
                    <div>운전가능</div>
                </span>
                <span>
                    <ImgCon>
                        <img src="/images/isEducated.png" alt="교육이수" />
                    </ImgCon>
                    <div>교육이수</div>
                </span>
                <span>
                    <ImgCon>
                        <img src="/images/orgAuth.png" alt="기관인증" />
                    </ImgCon>
                    <div>기관인증</div>
                </span>
            </Badges>
            <Text>
                눈이 끓는 사랑의 이상은 방황하여도, 없으면, 가치를 노래하며 끝에 철환하였는가? 투명하되 스며들어 우리
                사막이다. 속잎나고, 더운지라 있을 품었기 봄바람이다. 우리 품었기 얼마나 청춘의 부패를 이것을 그들은
                미묘한 귀는 것이다. 것이 이 우리 스며들어 우리의 새가 이것이다. 관현악이며, 평화스러운 무엇을 인생에
                사라지지 있는 거선의 듣는다. 품었기 가슴이 이상이 끓는 그들의 끝까지 천자만홍이 끓는다. 같이 청춘이
                굳세게 예수는 있는 피어나기 모래뿐일 만물은 이것이다. 갑 우리의 풍부하게 우는 평화스러운 커다란 것이다.
                평화스러운 일월과 있을 얼음과 청춘의 피가 것은 위하여서. 청춘의 봄바람을 있음으로써 전인 청춘은 끓는다.
                만물은 피가 우리는 가치를 때문이다. 인도하겠다는 얼음이 밝은 그들의 천자만홍이 없으면 뿐이다. 두기
                그들은 시들어 있는 인간이 심장의 품으며, 든 싸인 위하여서. 무엇을 용기가 풍부하게 끓는 아름다우냐?
                우리의 안고, 가는 피어나는 가지에 눈이 인생에 것이다. 아니한 우리 이상 두기 가지에 타오르고 그와
                교향악이다. 두기 공자는 생생하며, 구하지 싸인 뭇 보라. 하는 목숨을 인생을 위하여 것이다. 위하여, 천고에
                맺어, 희망의 원대하고, 오아이스도 운다. 그들의 못하다 아름답고 살 피고, 구하기 튼튼하며, 넣는 우리
                뿐이다. 유소년에게서 평화스러운 얼마나 돋고, 이 물방아 시들어 이것을 그러므로 것이다. 평화스러운 같이,
                않는 이상을 풀이 위하여서 예수는 그들은 부패뿐이다. 인생에 사는가 유소년에게서 위하여 그들은 아름다우냐?
                크고 굳세게 되려니와, 뭇 인생에 되는 타오르고 있다. 피가 같은 그들의 하여도 부패를 청춘 아름다우냐?
                쓸쓸한 긴지라 그들은 무엇을 힘차게 그림자는 때문이다. 영원히 별과 때에, 웅대한 주는 있는가? 구하기
                이상을 군영과 많이 있으랴?
            </Text>
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

export default Description;
