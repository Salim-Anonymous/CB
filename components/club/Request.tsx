import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function Request({ request, clubId }: { request: any, clubId: any }) {

    const [isAccepted, setIsAccepted] = useState(false);
    const [isRejected, setIsRejected] = useState(false);

    //accept request
    const acceptRequest = () => {
        console.log("accepting");
        updateDoc(doc(db, 'clubs', `${clubId}`, 'requests', request.id), {
            isAccepted: true,
        })
        //add user to club
        setDoc(doc(db, 'clubs', `${clubId}`, 'members', `${request.data().uid}`), {
            username: request.data().username,
            userImg: request.data().userImg,
            timestamp: request.data().timestamp,
            uid: request.data().uid,
        })

        // put the club in the user's club collection
        setDoc(doc(db, 'users', `${request.data().uid}`, 'clubs', clubId), {
            clubName: request.data().clubName,
            clubImg: request.data().clubImg,
            timestamp: request.data().timestamp,
        })

        console.log("accepted");
        setIsAccepted(true);
    }

    //reject request
    const rejectRequest = () => {
        updateDoc(doc(db, 'clubs', `${clubId}`, 'requests', request.id), {
            isRejected: true,
        })
        setIsRejected(true);
    }

    //get request status
    useEffect(() => {
        onSnapshot(doc(db, 'clubs', `${clubId}`, 'requests', request.id), (doc) => {
            setIsAccepted(doc.data().isAccepted);
        })
    }, []);

    console.log(request.data().uid);

    //display requests
    return (

        <div className="flex flex-col md:flex-row bg-white my-7 border rounded-md p-5">
            <div key={request.data().id} className="flex items-center justify-evenly space-x-5 mb-5">
                <img src={request.data().userImg} alt="" className="object-cover w-16 h-16 rounded-full" />
                <div>
                    <p className="font-semibold">{request.data().username}</p>
                    <p className="text-xs text-gray-400">{new Date(request.data().timestamp?.toDate()).toLocaleString()}</p>
                </div>
                <div className="flex items-center w-96 justify-center space-x-2">
                    <p className="overflow-x-auto text-center">{request.data().message}</p>
                </div>
                {isAccepted ? (
                    <div className="flex items-center justify-center space-x-2">
                        <p className="text-green-500">Accepted</p>
                    </div>
                ) : isRejected ? (
                    <div className="flex items-center justify-center space-x-2">
                        <p className="text-red-500">Rejected</p>
                    </div>
                ) : (<div className="flex items-center justify-center space-x-2">
                    <button onClick={() => { acceptRequest() }} className="text-green-500 cursor-pointer">Accept</button>
                    <button onClick={() => { rejectRequest() }} className="text-red-500 cursor-pointer">Decline</button>
                </div>)}
            </div>
        </div>

    )
}

export default Request