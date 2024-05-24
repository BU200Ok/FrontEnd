import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { closeInputModal, closeLinkModal } from './modalFunc';
import { setInputModalValue } from './modalActions';

const InputModal = () => {
    const handleModal = useSelector((state) => state.inputModal.isOpen);
    const modalMessage = useSelector((state) => state.inputModal.message);
    const [result,setResult] = useState('');
    const dispatch = useDispatch();

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            closeInputModal();
            // dispatch(setInputModalValue(result));
            closeInputModal();
            // setResult('');
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            <Modal isOpen={handleModal} fade={true}>
                <ModalHeader>
                    입력해주세요 (ESC키를 누르면 닫힙니다.)
                </ModalHeader>
                <ModalBody>
                    <section style={{display:'flex',flexDirection:'column'}}>
                        {modalMessage}
                        <input value={result} onChange={(e)=>{setResult(e.target.value)}} placeholder='입력'/>
                    </section>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={()=>{
                        closeInputModal();
                        dispatch(setInputModalValue(result));
                        setResult('');
                        }}>입력하기</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default InputModal;