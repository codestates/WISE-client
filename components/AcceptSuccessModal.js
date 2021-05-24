/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { useMemo } from 'react';
import Link from 'next/link';

const AcceptSuccessModal = ({ onClose, success, error }) => {
    // const style = useMemo(() => ({ marginRight: '1rem' }), []);
    const result = success ? '성공' : '실패';
    const errorMsg = error;
    return (
        <StyledModalOverlay onClick={onClose}>
            <StyledModal>
                <StyledModalHeader>
                    <div>신청 수락하기</div>
                </StyledModalHeader>
                <StyledModalBody>
                    <div>{success ? `매칭에 ${result}했습니다` : errorMsg} </div>
                    <Link href="/home">
                        <Button>홈으로 돌아가기</Button>
                    </Link>
                </StyledModalBody>
            </StyledModal>
        </StyledModalOverlay>
    );
};

const StyledModalOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledModal = styled.div`
    background: white;
    margin-top: -50%;
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
        color: #f0f0f0;
        font-weight: 600;
        background-color: #68d480;
    }
`;

AcceptSuccessModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    success: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

export default AcceptSuccessModal;
