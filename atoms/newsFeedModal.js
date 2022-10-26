import {atom} from 'recoil';

export const newsFeedModal = atom({
    key: 'newsFeedModalState',
    default: {
        isOpen: false,
        content: null,
    },
});