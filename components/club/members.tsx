import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function Members() {

    const [members, setMembers] = useState([]);
    const router = useRouter();
    const clubId = router.query.id;

    // get members
    useEffect(() => {
        const data = onSnapshot(
            collection(db, 'clubs', `${clubId}`, 'members'),
            snapshot => {
                setMembers(snapshot.docs);
            })
        return () => { data() }
    }, [clubId]);

    //display requests
    return (
        <div className='flex flex-col items-start justify-center p-5 m-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Members</h1>
            </div>
            <div className='flex flex-col mt-4'>
                {members.map((member) => (
                    <div key={member.id} className='flex items-center space-x-4 mb-5'>
                        <img className='rounded-full h-10' src={member.data().userImg} alt='' />
                        <p className='font-semibold text-sm'>{member.data().username}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Members