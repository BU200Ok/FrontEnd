export const openModal = () => ({
    type: 'open_modal'
});
export const closeModal = () => ({
    type: 'close_modal'
});
export const setMessage = (message) => ({
    type: 'set_message',
    payload : message
});

export const openLinkModal = () => ({
    type: 'open_linkModal'
});
export const closeLinkModal = () => ({
    type: 'close_linkModal'
});
export const setLinkMessage = (message) => ({
    type: 'set_linkMessage',
    payload : message
});
export const setLink = (link) => ({
    type: 'set_link',
    payload : link
});

export const openInputModal = () => ({
    type: 'open_inputModal'
});
export const handleCloseInputModal = (message) => ({
    type: 'close_inputModal',
    payload: message
});
export const setInputModalMessage = (message) => ({
    type: 'set_inputMessage',
    payload: message
});

export const setInputModalValue = (value) => ({
    type: 'set_input_value',
    payload: value,
})