import styled from 'styled-components';

const Review = ({ review }) => (
    <>
        <Wrapper id="review">
            <h2>후기 (26개)</h2>
            <ReviewBox>
                <ReviewItem>
                    <img src="/images/avatar_default.png" alt="review avatar" />
                    <span>이지은</span>
                    {/* <span>{review.customer}</span> */}
                    {/* <div>{review.content}</div> */}
                    <div>
                        제가 젊은 나이에 거동이 힘들어 외출은 생각도 안했는데 이 곳 덕분에 방안에만 있다가 바깥공기를
                        쐬고 오니 기분이 한결 좋아졌네요 몸이 불편한 사람들은 어디 한번 나가기가 너무 힘들고 누군가에게
                        부탁기도 어려운데 앞으로 자주 이용할것 같습니다. 너무 감사드리고 저 챙겨주신분께도 감사드립니다.
                    </div>
                </ReviewItem>
                <ReviewItem>
                    <img src="/images/avatar_default.png" alt="review avatar" />
                    <span>고민시</span>
                    <div>
                        코로나로 인해 어디든 맘대로 다니기 어려운 지금... 저는 맞벌이에 지역에 살고 동생은 아이 때문에
                        외출이 쉽지 않아 걱정이었는데 좋은 메이트 분을 만나 한시름 덜었습니다. 약속 시간보다 먼저
                        도착해서 미리 설명도 들어주시고 엄마도 잘 보살펴주셔서 너무 감사해요~ 방사선 치료때도
                        잘부탁드립니다.
                    </div>
                </ReviewItem>
                <ReviewItem>
                    <img src="/images/avatar_default.png" alt="review avatar" />
                    <span>이상이</span>
                    <div>
                        내시경 할때마다 늘 보호자와 함께 오라고 해서 주변 지인들에게 민폐 아닌 민폐를 끼치게 되는 경우가
                        있었는데 이런 좋은 서비스가 있을줄 몰랐네요. 회사 동료들에게도 알려줘야겠습니다. 이런 좋은
                        서비스는 홍익인간의 정신으로 널리 알려야 마땅합니다. ㅋㅋㅋ
                    </div>
                </ReviewItem>
                <ReviewItem>
                    <img src="/images/avatar_default.png" alt="review avatar" />
                    <span>정기석</span>
                    <div>
                        먼젓번 이용하고 너무 만족스러워서 또 찾게 되었어요. 엄마도 편하게 진료보시고 계속 연락주셔서
                        저도 마음편하게 일하며 진료상황을 알 수 있었어요. 조만간 또 연락드릴게요~ 오늘도 정말
                        감사합니다.^^
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
