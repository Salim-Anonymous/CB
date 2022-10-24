import { useRecoilState } from 'recoil';
import { modalAtom } from '../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import loadConfig from 'next/dist/server/config';

function Modal() {
    const [open, setOpen] = useRecoilState(modalAtom);
    const filePickerRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading,setLoading] = useState(false);

    const uploadPost = async()=>{
        if(loading) return;
        setLoading(true);
    }

    const captionRef = useRef(null);

    const onClose = () => {
        setOpen({ ...open, isOpen: false });
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    return (
        <Transition.Root show={open.isOpen}>
            <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={onClose}>
                <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as="div"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as="div"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-middle bg-white rounded-lg 
                        text-left overflow-hidden shadow-xl transform transition-all 
                        sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div>
                                {selectedFile ? (
                                    <div>
                                        <img src={selectedFile} onClick={() => { setSelectedFile(null) }} alt="image" />
                                    </div>
                                )
                                    :
                                    (
                                        <div>
                                            <div
                                                onClick={() => { filePickerRef.current.click() }}
                                                className="flex items-center justify-center bg-white px-4 pt-5 pb-4 mb-6 sm:p-6 sm:pb-4">
                                                <CameraIcon
                                                    className='h-10 w-10 text-red-600 cursor-pointer'
                                                    aria-hidden='true'
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <input
                                    type="file"
                                    hidden
                                    ref={filePickerRef}
                                    onChange={addImageToPost}
                                />
                            </div>
                            <div>
                                <input
                                    ref={captionRef}
                                    type="text"
                                    placeholder="enter a caption"
                                    className="border-none focus:ring-0 w-full text-center text-xl"
                                />
                            </div>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <button
                                        type="button"
                                        className='inline-flex justify-center w-full rounded-md border
                                            border-transparent shadow-sm px-4 py-2 bg-red-600 text-base
                                            font-medium text-white hover:bg-red-600 focus:outline-none
                                            focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm
                                            disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300
                                            '
                                    >
                                        Upload Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Modal;

