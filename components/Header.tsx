import Image from 'next/image';
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { modalAtom } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { addClubModal } from '../atoms/addClubModal';

function Header() {

    const { data: session } = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalAtom);
    const [createClub, setCreateClub] = useRecoilState(addClubModal);
    const [isAdmin, setIsAdmin] = useState(false);

    // @ts-ignore
    const userId = session?.user?.uid;
    // @ts-ignore
    const [user, setUser] = useState({});

    //check if the user is admin
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'users', `${userId}`), (doc) => {
            setUser(doc.data());
            // @ts-ignore
            if (doc.data()?.isAdmin) {
                setIsAdmin(true);
            }
        });

        return unsubscribe;
    }, [userId]);


    return (
        <div className="shadow-sm border-b-1 bg-white sticky top-0 z-50">
            <div className="flex justify-between bg-white max-w-6xl mx-5 xl:mx-auto">
                {/*Left*/}
                <div onClick={() => router.push('/')} className="relative hidden lg:inline-grid w-32 cursor-pointer">
                    <Image
                        src="/image/logo.svg"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div onClick={() => router.push('/')} className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
                    <Image
                        src="/image/logo-no-background.svg"
                        layout="fill"
                        objectFit={"contain"}
                    />
                </div>
                {/*Middle*/}
                <div className="max-w-xs">
                    <div className="relative mt-1 p-3 rounded-md ">
                        <div className="absolute inset-y-0 pl-3 flex items-center
                 pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input className="bg-gray-50 block w-full pl-10
                      sm:text-sm border-gray-300
                      rounded-md focus:ring-black focus:border-black"
                            type="text" placeholder="search" />
                    </div>
                </div>
                {/*Right*/}
                <div className="flex items-center justify-end space-x-4">
                    <HomeIcon onClick={() => router.push('/')} className="navBtn" />
                    <MenuIcon className="h-6 w-6 md:hidden
                cursor-pointer"/>
                    {session ? (
                        <>
                            {/* <div className="relative navBtn ">
                        <PaperAirplaneIcon className="navBtn rotate-45" />
                        <div className="absolute -top-1 -right-2 text-xs w-5 h-5
                    bg-red-500 rounded-full flex items-center justify-center
                    animate-pulse text-white">3</div>
                    </div> */}
                            <PlusCircleIcon onClick={() => setOpen({
                                isOpen: true,
                                content: "open modal"
                            })} className="navBtn" />
                            <UserGroupIcon
                                onClick={() => { router.push('/club') }}
                                className="navBtn" />
                            <img
                                src={session?.user?.image}
                                alt="profile"
                                className="h-10 rounded-full cursor-pointer"
                                onClick={() => signOut()}
                            />
                            {isAdmin && <button
                                onClick={() => setCreateClub({
                                    isOpen: true,
                                    content: "open club modal"
                                })}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
                            >Add Club</button>}
                        </>)
                        : (
                            <>
                                <UserGroupIcon
                                    onClick={() => { router.push('/club') }}
                                    className="navBtn" />
                                <button className="text-blue-400 font-semibold text-sm
                        border border-blue-400 rounded-full py-1 px-2"
                                    onClick={() => { signIn() }}
                                >Sign In</button>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Header

