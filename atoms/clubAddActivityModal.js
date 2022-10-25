import {atom} from 'recoil';

export const clubActivityModal = atom({
    key: 'addClubActivityModalState',
    default: {
        isOpen: false,
        content: null,
    },
});