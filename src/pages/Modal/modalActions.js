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