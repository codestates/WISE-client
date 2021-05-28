/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from 'styled-components';
// import { useMemo } from 'react';
import Link from 'next/link';

type Props = {
    onClose: () => void;
    success: boolean;
    error: string;
};

const ReservationSuccessModal = ({ onClose, success, error }: Props) => {
    const result = success ? '성공' : '실패';
    // const errorMsg = error ? '로그인을 먼저 해주세요!' : '';
    return (
        <StyledModalOverlay onClick={onClose}>
            <StyledModal>
                <StyledModalHeader>
                    <div>서비스 신청하기</div>
                </StyledModalHeader>
                <StyledModalBody>
                    {success ? (
                        <>
                            <div>{`서비스 신청에 ${result}했습니다`}</div>
                            <Link href="/home">
                                <Button>홈으로 돌아가기</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <div>{error}</div>
                            <Link href="/user/signin">
                                <Button>로그인하러 가기</Button>
                            </Link>
                        </>
                    )}
                </StyledModalBody>
            </StyledModal>
        </StyledModalOverlay>
    );
};

const StyledModalOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 1250px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledModal = styled.div`
    background: white;
    margin-top: 10%;
    width: 30rem;
    height: 16rem;
    border-radius: 0.5rem;
    box-shadow: 0.3rem 0.2rem 0.4rem #999, -0.3rem 0.2rem 0.4rem #999;
    padding: 1.5rem 2rem;
    z-index: 100;
`;

const StyledModalHeader = styled.div`
    color: #222;
    font-size: 1.1rem;
    font-weight: 600;
    padding-bottom: 1rem;
    border-bottom: 1px solid #d0d0d0;
    width: 100%;
`;

const StyledModalBody = styled.div`
    padding-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 1rem 0;
        color: #424242;
    }
`;

const Button = styled.a`
    margin-top: 1rem;
    padding: 0 0.7rem;
    width: 80%;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    background-color: #fff;
    border: 1px solid #68d480;
    border-radius: 1.2rem;
    font-size: 0.9rem;
    &:hover {
        color: #fff;
        font-weight: 600;
        background-color: #68d480;
    }
`;

export default ReservationSuccessModal;
