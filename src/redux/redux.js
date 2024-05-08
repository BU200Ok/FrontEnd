import { configureStore } from "@reduxjs/toolkit"; 

const initialState = {
    message : "",
    isOpen : false,
}

const linkModalState = {
    message : "",
    isOpen : false,
    link : "",
}

const modalReducer = (state = initialState, action) => {
    switch(action.type){
        case 'open_modal':
            return {...state, isOpen : true};
        case 'close_modal' :
            return {...state, isOpen: false};
        case 'set_message' :
            return {...state, message: action.payload};
        default:
            return state;
    }
}

const linkModalReducer = (state = linkModalState, action) => {
    switch(action.type){
        case 'open_linkModal':
            return {...state, isOpen : true};
        case 'close_linkModal' :
            return {...state, isOpen: false};
        case 'set_linkMessage' :
            return {...state, message: action.payload};
        case 'set_link' :
            return {...state, link: action.payload};
        default:
            return state;
    }
}

const store = configureStore({
    reducer: {
        modal: modalReducer,
        linkModal: linkModalReducer,
    }
})
export default store;