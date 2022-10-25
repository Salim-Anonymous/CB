import { ChatIcon, BookmarkIcon, DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon, EmojiHappyIcon, UserAddIcon, CheckIcon, StarIcon } from "@heroicons/react/outline";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "../Post";

function ClubItem(
    {
        id,
        name,
        description,
        clubImg,
        createdAt,
        updatedAt
    }: {
        id: string,
        description: string,
        name: string,
        clubImg: string,
        createdAt: string,
        updatedAt: string
    }
) {

    const { data: session } = useSession();
    const [joinMessage, setJoinMessage] = useState("I Like This Club");
    const [sendingRequest, setSendingRequest] = useState(false);
    const [reqestSent, setRequestSent] = useState(false);
    const [hasAlreadyJoined, setHasAlreadyJoined] = useState(false);
    const [hasAlreadySentRequest, setHasAlreadySentRequest] = useState(false);

    //send request to join club
    const sendRequest = async () => {
        setSendingRequest(true);
        await addDoc(collection(db, 'clubs', id, 'requests'), {
            username: session.user.name,
            userImg: session.user.image,
            message: joinMessage,
            clubName: name,
            clubImg: clubImg,
            timestamp: serverTimestamp(),
            // @ts-ignore
            uid: session.user.uid,
        })
        setSendingRequest(false);
        setRequestSent(true);
    }

    //check if user has already joined the club
    useEffect(() => {
        const data = onSnapshot(
            query(collection(db, 'clubs', id, 'members'), orderBy('timestamp', 'desc')),
            snapshot => {
                snapshot.docs.map(doc => {
                    if (doc.data().username === session.user.name) {
                        setHasAlreadyJoined(true);
                    }
                })
            })
        return () => { data() }
    }, []);

    //check if user has already sent a request to join the club
    useEffect(() => {
        const data = onSnapshot(
            query(collection(db, 'clubs', id, 'requests'), orderBy('timestamp', 'desc')),
            snapshot => {
                snapshot.docs.map(doc => {
                    if (doc.data().username === session.user.name) {
                        setHasAlreadySentRequest(true);
                    }
                })
            })
        return () => { data() }
    }, []);


    return (
        <div className="flex flex-col md:flex-row bg-white my-7 border rounded-md p-5">
            {/* Img */}
            <img src={clubImg} alt="" className="object-cover w-48 md:w-64 m-10 rounded-full " />
            {/* description */}
            <div className="flex flex-col items-center justify-center w-full">
                <div
                    onClick={() => router.push(`/club/${id}`)}
                    className="m-5 text-2xl md:text-4xl cursor-pointer">
                    {name}
                </div>
                {hasAlreadyJoined ? (
                    <div className="flex items-center justify-center space-x-2">
                        <CheckIcon className="h-5 text-green-500" />
                        <p className="text-green-500">Joined</p>
                    </div>
                ) : hasAlreadySentRequest ? (
                    <div className="flex items-center justify-center space-x-2">
                        <CheckIcon className="h-5 text-green-500" />
                        <p className="text-green-500">Request Sent</p>
                        </div>) : (<div>
                    <label htmlFor="my-modal-6" className="btn modal-button">send request <UserAddIcon className="w-6 h-6 ml-8" /></label>
                    <input type="checkbox" id="my-modal-6" className="modal-toggle" />

                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box flex flex-col p-2 items-center justify-center">
                            <input type="text" value={joinMessage} onChange={(e) => setJoinMessage(e.target.value)} className="border-emerald-500 focus:ring-2 focus:border-black w-full h-20 mt-5" />
                            {sendingRequest ? (
                                <button className="inline-flex justify-center w-64 rounded-md border m-10
                            border-transparent shadow-sm px-4 py-2 bg-black text-base
                            font-medium text-white focus:outline-none
                            focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm
                            disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                                >
                                    Sending Request
                                    <UserAddIcon className="w-6 h-6 ml-8" />
                                </button>
                            ) : (
                                <button className="inline-flex justify-center w-64 rounded-md border m-10
                                    border-transparent shadow-sm px-4 py-2 bg-black text-base
                                    font-medium text-white hover:bg-green-600 focus:outline-none
                                    focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm
                                    disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                                    onClick={sendRequest}
                                    disabled={reqestSent}
                                >
                                    Send Request
                                    <UserAddIcon className="w-6 h-6 ml-8" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>)}
            </div>

        </div>
    );
}

export default ClubItem
