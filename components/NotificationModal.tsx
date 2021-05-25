/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { useMemo } from 'react';
import Link from 'next/link';
import { ReactElement } from 'react';

const NotificationModal = (): ReactElement => (
    // const style = useMemo(() => ({ marginRight: '1rem' }), []);

    <StyledModalOverlay>
        <StyledModal>
            <StyledModalHeader>
                <div>새 알림</div>
            </StyledModalHeader>
            <StyledModalBody>
                <Noti>
                    <div>서비스 신청이 1건 있습니다</div>
                    <div>
                        <Link href="/service/accept/60aa0f1641ec6823dbe2e6fb">
                            <Button>확인하기</Button>
                        </Link>
                    </div>
                </Noti>
                <Noti>
                    <div>김천사 어시스턴트가 신청을 수락했습니다</div>
                    <div>
                        <Link href="/service/accept/reservationId">
                            <Button>결제하러 가기</Button>
                        </Link>
                    </div>
                </Noti>
                <Noti>
                    <div>서비스 신청이 1건 있습니다</div>
                    <div>
                        <Link href="/service/accept/reservationId">
                            <Button>확인하기</Button>
                        </Link>
                    </div>
                </Noti>
                <Noti>
                    <div>서비스 신청이 1건 있습니다</div>
                    <div>
                        <Link href="/service/accept/reservationId">
                            <Button>확인하기</Button>
                        </Link>
                    </div>
                </Noti>
                <Noti>
                    <div>서비스 신청이 1건 있습니다</div>
                    <div>
                        <Link href="/service/accept/reservationId">
                            <Button>확인하기</Button>
                        </Link>
                    </div>
                </Noti>
                <Noti>
                    <div>서비스 신청이 1건 있습니다</div>
                    <div>
                        <Link href="/service/accept/reservationId">
                            <Button>확인하기</Button>
                        </Link>
                    </div>
                </Noti>
                <Noti>
                    <div>서비스 신청이 1건 있습니다</div>
                    <div>
                        <Link href="/service/accept/reservationId">
                            <Button>확인하기</Button>
                        </Link>
                    </div>
                </Noti>
                <Noti>
                    <div>서비스 신청이 1건 있습니다</div>
                    <div>
                        <Link href="/service/accept/reservationId">
                            <Button>확인하기</Button>
                        </Link>
                    </div>
                </Noti>
            </StyledModalBody>
        </StyledModal>
    </StyledModalOverlay>
);
const StyledModalOverlay = styled.div`
    position: absolute;
    top: 11rem;
    right: 5%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledModal = styled.div`
    background: white;
    width: 30rem;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0.3rem 0.2rem 0.4rem #f0f0f0, -0.3rem 0.2rem 0.4rem #f0f0f0;
    padding: 1.5rem 2rem;
    z-index: 100;
    overflow-y: scroll;
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
`;

const Noti = styled.div`
    width: 100%;
    margin: 0.6rem 0;
    display: flex;
    justify-content: space-between;
    div:first-child {
        margin-right: 10%;
        font-size: 0.9rem;
    }
`;

const Button = styled.a`
    padding: 0 0.7rem;
    width: 100%;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    background-color: #f5f5f5;
    border: 1px solid #f0f0f0;
    border-radius: 1.2rem;
    font-size: 0.9rem;
    &:hover {
        border: 1px solid #68d480;
        /* background-color: #fff; */
    }
`;

// NotificationModal.propTypes = {
//     onClose: PropTypes.func.isRequired,
// };

export default NotificationModal;
