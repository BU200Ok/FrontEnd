import { openModal, closeModal as handleCloseModal, setMessage, openLinkModal, closeLinkModal as handleCloseLinkModal, setLinkMessage, setLink } from "./modalActions";
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