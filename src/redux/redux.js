import { configureStore } from "@reduxjs/toolkit"; 
import { setInputModalValue } from "../pages/Modal/modalActions";

const initialState = {
    message : "",
    isOpen : false,
}

const linkModalState = {
    message : "",
    isOpen : false,
    link : "",
}

const inputModalState = {
    message: "",
    isOpen: false,
}

const inputModalValueState = {
    value: "",
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

const inPutModalReducer = (state = inputModalState, action) => {
    switch(action.type){
        case 'open_inputModal':
            return {...state, isOpen : true};
        case 'close_inputModal' :
            console.log('온다2');
            return {...state, isOpen: false};
        case 'set_inputMessage' :
            return {...state, message: action.payload};
        default:
            return state;
    }
}

const inputModalValueReducer = (state = inputModalValueState, action) => {
    switch(action.type){
        case 'set_input_value':
            return {...state, value: action.payload};
        default:
            return state;
    }
}

const store = configureStore({
    reducer: {
        modal: modalReducer,
        linkModal: linkModalReducer,
        inputModal: inPutModalReducer,
        inputModalValue: inputModalValueReducer,
    }
})
export default store;