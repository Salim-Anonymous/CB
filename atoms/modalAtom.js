import {atom} from 'recoil';

export const modalAtom = atom({
    key: 'uploadModalState',
    default: {
        isOpen: false,
        content: null,
    },
});