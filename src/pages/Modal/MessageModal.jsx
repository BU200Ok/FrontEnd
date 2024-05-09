import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { closeModal } from './modalFunc';
const MessageModal= () => {
    const handleModal = useSelector((state) => state.modal.isOpen);
    const modalMessage = useSelector((state) => state.modal.message);
    // 키보드 이벤트 핸들러
    const handleKeyDown = (event) => {
        if (event.key === 'Escape' || event.key === 'Enter') {//esc나 enter키를 누른다면
            closeModal();  // 모달 닫기 함수 호출
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트되면 이벤트 리스너 추가
        document.addEventListener('keydown', handleKeyDown);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <div>
            <Modal isOpen={handleModal} fade={true}>
                <ModalHeader>
                    Status
                </ModalHeader>
                <ModalBody>
                    {modalMessage}
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={closeModal}>닫기</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default MessageModal;