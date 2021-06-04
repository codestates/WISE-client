/* eslint-disable react/require-default-props */
import styled from 'styled-components';
import Link from 'next/link';

// const [showModal, setShowModal] = useState(false);

// const onCloseModal = useCallback(() => {
//   setShowModal(false);
// }, []);

type ResultModalProps = {
    onClose: () => void;
    title: string;
    message: string;
    redirection?: 'home' | 'signin' | 'none';
};

const ResultModal = ({ onClose, title, message, redirection }: ResultModalProps) => (
    <ModalOverlay onClick={onClose}>
        <Modal>
            <ModalHeader>
                <div>{title}</div>
            </ModalHeader>
            <ModalBody>
                <div>{message}</div>
                {redirection === 'home' && (
                    <Link href="/home">
                        <Button>홈으로 돌아가기</Button>
                    </Link>
                )}
                {redirection === 'signin' && (
                    <Link href="/user/signin">
                        <Button>로그인하러 가기</Button>
                    </Link>
                )}
                {redirection === 'none' && <Button>확인</Button>}
            </ModalBody>
        </Modal>
    </ModalOverlay>
);

const ModalOverlay = styled.div`
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

const Modal = styled.div`
    background: white;
    // margin-top: -30%;
    width: 30rem;
    height: 16rem;
    border-radius: 0.5rem;
    box-shadow: 0.3rem 0.2rem 0.4rem #999, -0.3rem 0.2rem 0.4rem #999;
    padding: 1.5rem 2rem;
    z-index: 100;
`;

const ModalHeader = styled.div`
    color: #222;
    font-size: 1.1rem;
    font-weight: 600;
    padding-bottom: 1rem;
    border-bottom: 1px solid #d0d0d0;
    width: 100%;
`;

const ModalBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 2rem;
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

export default ResultModal;
