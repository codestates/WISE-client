import styled from 'styled-components';
import ActiveLink from './ActiveLink';

type IdProps = {
    _id: string | string[];
};

const Navigation = ({ _id }: IdProps) => {
    const DETAIL_URL = `/service/detail/${_id}`;
    // TODO: url search query 추가
    return (
        <>
            <Wrapper>
                <ActiveLink href={`${DETAIL_URL}#description`} activeClassName="active">
                    <a>어시스턴트 소개</a>
                </ActiveLink>
                <ActiveLink href={`${DETAIL_URL}#review`} activeClassName="active">
                    <a>후기</a>
                </ActiveLink>
                <ActiveLink href={`${DETAIL_URL}#faq`} activeClassName="active">
                    <a>자주 묻는 질문</a>
                </ActiveLink>
                <ActiveLink href={`${DETAIL_URL}#refund`} activeClassName="active">
                    <a>환불 정책</a>
                </ActiveLink>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
    height: 4rem;
    color: #555;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    width: 100%;
    a {
        font-size: 0.9rem;
        font-weight: 500;
        &:hover {
            color: #68d480;
        }
    }
    .active {
        border-bottom: 2px solid #68d480;
        color: #58d480;
    }
`;

export default Navigation;
