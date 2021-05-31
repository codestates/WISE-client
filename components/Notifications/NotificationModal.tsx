import styled from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { Notification } from '../../interfaces/data/notifications';

const NotificationModal = () => {
    const { notifications } = useSelector((state: RootState) => state.notifications);

    return (
        <StyledModalOverlay>
            <StyledModal>
                <StyledModalHeader>
                    <div>새 알림</div>
                </StyledModalHeader>
                <StyledModalBody>
                    {notifications ? (
                        <>
                            {notifications.map((notification: Notification) => (
                                <Noti key={notification._id}>
                                    <div>{notification.content}</div>
                                    <div>
                                        {notification.isChecked ? (
                                            <CheckedButton disabled>확인 완료</CheckedButton>
                                        ) : (
                                            <Link href={notification.clientUrl}>
                                                <Button>확인하기</Button>
                                            </Link>
                                        )}
                                    </div>
                                </Noti>
                            ))}
                        </>
                    ) : (
                        <Noti>새로운 알림이 없습니다.</Noti>
                    )}
                </StyledModalBody>
            </StyledModal>
        </StyledModalOverlay>
    );
};
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

const CheckedButton = styled.button`
    padding: 0 0.7rem;
    width: 100%;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: #fff;
    background-color: #ccc;
    border: none;
    border-radius: 1.2rem;
`;

export default NotificationModal;