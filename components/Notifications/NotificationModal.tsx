/* eslint-disable react/button-has-type */
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../../reducers';
import { Notification } from '../../interfaces/data/notifications';
import { checkNotificationRequest } from '../../actions/notifications';

type Props = {
    onClose: () => void;
};

const NotificationModal = ({ onClose }: Props) => {
    const dispatch = useDispatch();
    const { notifications } = useSelector((state: RootState) => state.notifications);

    // 알림 확인버튼 누르면 isChecked로 변경 요청
    const handleCheckNotification = useCallback(
        (notificationId) => {
            console.log(notificationId);
            dispatch(checkNotificationRequest(notificationId));
            console.log('go dispatch!');
        },

        [dispatch],
    );

    return (
        <StyledModalOverlay onClick={onClose}>
            <StyledModal>
                <StyledModalHeader>
                    <div>새 알림</div>
                </StyledModalHeader>
                <StyledModalBody>
                    {notifications.length > 0 ? (
                        <>
                            {notifications.map((notification: Notification) => (
                                <Noti key={notification._id}>
                                    <div>{notification.content}</div>
                                    <div>
                                        {notification.isChecked ? (
                                            <CheckedButton disabled>확인</CheckedButton>
                                        ) : (
                                            <Link href={notification.clientUrl}>
                                                <Button>
                                                    <button onClick={() => handleCheckNotification(notification._id)}>
                                                        확인하기
                                                    </button>
                                                </Button>
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
    top: 4rem;
    right: 0;
    width: 100%;
    height: 110vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledModal = styled.div`
    position: absolute;
    top: 0;
    right: 20%;
    background: white;
    width: 30rem;
    height: 20rem;
    border-radius: 0.2rem;
    box-shadow: 0.3rem 0.2rem 0.4rem rgba(27, 27, 27, 0.2), -0.3rem 0.2rem 0.4rem rgba(27, 27, 27, 0.2);
    padding: 1.5rem 2rem;
    z-index: 100;
    overflow-y: scroll;

    @media ${(props) => props.theme.tablet} {
        width: 23rem;
    }
    @media ${(props) => props.theme.mobile} {
        width: 18rem;
        right: 0;
    }
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
    @media ${(props) => props.theme.tablet} {
        div:first-child {
            margin-right: 5%;
            font-size: 0.9rem;
        }
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
    }
    button {
        border: none;
        background: none;
        cursor: pointer;
    }
    @media ${(props) => props.theme.tablet} {
        font-size: 0.7rem;
    }
`;

const CheckedButton = styled.button`
    padding: 0 0.7rem;
    width: 3.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: #fff;
    background-color: #ccc;
    border: none;
    border-radius: 1.2rem;
    @media ${(props) => props.theme.tablet} {
        font-size: 0.7rem;
    }
`;

export default NotificationModal;
