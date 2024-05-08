import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { closeLinkModal } from './modalFunc';
import { Link } from 'react-router-dom';
const LinkModal = () => {
    const handleModal = useSelector((state) => state.linkModal.isOpen);
    const modalMessage = useSelector((state) => state.linkModal.message);
    const link = useSelector((state) => state.linkModal.link);

    // 키보드 이벤트 핸들러
    const handleKeyDown = (event) => {
        if (event.key === 'Escape' || event.key === 'Enter') {//esc나 enter키를 누른다면
            closeLinkModal();  // 모달 닫기 함수 호출
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
                    <Link to={link}><Button color='primary' onClick={closeLinkModal}>닫기</Button></Link>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default LinkModal;