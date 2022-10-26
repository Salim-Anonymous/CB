import {atom} from 'recoil';

export const addClubModal = atom({
    key: 'addClubActivityModalState',
    default: {
        isOpen: false,
        content: null,
    },
});