import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function MemberList() {

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

    //kick member
    const kickMember = async (memberId) => {
        await deleteDoc(doc(db, 'clubs', `${clubId}`, 'members', `${memberId}`));
        //remove club from user's clubs collection
        const userRef = doc(db, 'users', `${memberId}`, 'clubs', `${clubId}`);
        deleteDoc(userRef);
    }

    //promote member
    const promoteMember = async (memberId) => {
        // add the member to moderators array
        const clubRef = doc(db, 'clubs', `${clubId}`);
        // get moderators array
        let moderator = [];
        const clubDoc = await getDoc(clubRef);
        if (clubDoc.exists()) {
            moderator = clubDoc.data().moderators;
        } else {
            console.log("No such document!");
        }
        // add member to moderators array
        moderator.push(memberId);
        // update moderators array
        await updateDoc(clubRef, {
            moderators: moderator
        });
    }

    members.map(member => {
        console.log(member.id);
    })

    //display requests in a grid vertically
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-5">Members</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {members.map((member) => (
                    <div key={member.id} className="flex flex-col items-center justify-center bg-white my-7 border rounded-md p-5">
                        <img src={member.data().userImg} alt="" className="object-cover w-16 h-16 rounded-full" />
                        <p className="font-semibold">{member.data().username}</p>
                        <p className="text-xs text-gray-400">{new Date(member.data().timestamp?.toDate()).toLocaleString()}</p>
                        <button onClick={() => kickMember(member.id)} className="bg-red-500 text-white px-4 py-1 rounded-md mt-5">Kick</button>
                        <button onClick={() => promoteMember(member.data().uid)} className="bg-green-500 text-white px-4 py-1 rounded-md mt-5">Promote</button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default MemberList