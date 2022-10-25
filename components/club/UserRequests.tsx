import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Request from "./Request";

function UserRequests() {

    const router = useRouter();
    const clubId = router.query.id;
    const [requests, setRequests] = useState([]);

    //get requests
    useEffect(() => {
        const data = onSnapshot(
            query(collection(db, 'clubs', `${clubId}`, 'requests'), orderBy('timestamp', 'desc')),
            snapshot => {
                setRequests(snapshot.docs);
            })
        return () => { data() }
    }, []);
    //display requests
    return (
        <div className="flex flex-col w-full bg-white my-7 border rounded-md p-5">
            {requests.map((value) => (
                <Request key={value.data().id} request={value} clubId={clubId} />
            ))}
        </div>
    )
}

export default UserRequests