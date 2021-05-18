import styled from 'styled-components';

const Review = () => (
    <>
        <Wrapper id="review">
            <h2>후기 (26개)</h2>
            <ReviewBox>
                <ReviewItem>
                    <img src="/images/avatar_default.png" alt="review avatar" />
                    <span>이지은</span>
                    <div>
                        제가 젊은 나이에 거동이 힘들어 외출은 생각도 안했는데 이 곳 덕분에 방안에만 있다가 바깥공기를
                        쐬고 오니 기분이 한결 좋아졌네요 몸이 불편한 사람들은 어디 한번 나가기가 너무 힘들고 누군가에게
                        부탁기도 어려운데 앞으로 자주 이용할것 같습니다. 너무 감사드리고 저 챙겨주신분께도 감사드립니다.
                    </div>
                </ReviewItem>
                <ReviewItem>
                    <img src="/images/avatar_default.png" alt="review avatar" />
                    <span>이지은</span>
                    <div>
                        제가 젊은 나이에 거동이 힘들어 외출은 생각도 안했는데 이 곳 덕분에 방안에만 있다가 바깥공기를
                        쐬고 오니 기분이 한결 좋아졌네요 몸이 불편한 사람들은 어디 한번 나가기가 너무 힘들고 누군가에게
                        부탁기도 어려운데 앞으로 자주 이용할것 같습니다. 너무 감사드리고 저 챙겨주신분께도 감사드립니다.
                    </div>
                </ReviewItem>
                <ReviewItem>
                    <img src="/images/avatar_default.png" alt="review avatar" />
                    <span>이지은</span>
                    <div>
                        제가 젊은 나이에 거동이 힘들어 외출은 생각도 안했는데 이 곳 덕분에 방안에만 있다가 바깥공기를
                        쐬고 오니 기분이 한결 좋아졌네요 몸이 불편한 사람들은 어디 한번 나가기가 너무 힘들고 누군가에게
                        부탁기도 어려운데 앞으로 자주 이용할것 같습니다. 너무 감사드리고 저 챙겨주신분께도 감사드립니다.
                    </div>
                </ReviewItem>
                <ReviewItem>
                    <img src="/images/avatar_default.png" alt="review avatar" />
                    <span>이지은</span>
                    <div>
                        제가 젊은 나이에 거동이 힘들어 외출은 생각도 안했는데 이 곳 덕분에 방안에만 있다가 바깥공기를
                        쐬고 오니 기분이 한결 좋아졌네요 몸이 불편한 사람들은 어디 한번 나가기가 너무 힘들고 누군가에게
                        부탁기도 어려운데 앞으로 자주 이용할것 같습니다. 너무 감사드리고 저 챙겨주신분께도 감사드립니다.
                    </div>
                </ReviewItem>
            </ReviewBox>
        </Wrapper>
    </>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 5rem 0;
    color: #555;
    width: 100%;
    h2 {
        margin-left: 2rem;
        font-weight: 600;
    }
`;

const ReviewBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const ReviewItem = styled.div`
    /* width: 10rem; */
    padding: 1rem 2rem;
    img {
        width: 2rem;
        margin-right: 1rem;
    }
    div {
        margin-top: 1rem;
    }
`;

export default Review;
