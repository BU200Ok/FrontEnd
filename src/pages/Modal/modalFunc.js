import { openModal, closeModal as handleCloseModal, setMessage, openLinkModal, closeLinkModal as handleCloseLinkModal, setLinkMessage, setLink, setInputModalMessage, openInputModal, handleCloseInputModal } from "./modalActions";
import store from "../../redux/redux";

export const openModalWithMessage = (message) => {
    store.dispatch(setMessage(message));
    store.dispatch(openModal());
};

export const closeModal = () =>{
    store.dispatch(handleCloseModal());
}

export const openLinkModalWithMessage = (message, link) => {
    store.dispatch(setLinkMessage(message));
    store.dispatch(setLink(link));
    store.dispatch(openLinkModal());
};

export const closeLinkModal = () =>{
    store.dispatch(handleCloseLinkModal());
}

export const openInputModalWithMassage = (message) => {
    store.dispatch(setInputModalMessage(message));
    store.dispatch(openInputModal());
}
export const closeInputModal = (message) =>{
    store.dispatch(handleCloseInputModal(message));
}