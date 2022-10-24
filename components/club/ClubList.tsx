import { ChatIcon, BookmarkIcon, DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "../Post";
import ClubItem from "./ClubItem";

function ClubList() {

    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        const data = onSnapshot(
            query(collection(db, 'clubs'), orderBy('createdAt', 'desc')),
            snapshot => {
                setClubs(snapshot.docs);
            })

        return () => { data() }
    }, []);

    console.log(clubs)

    return (
        <div className="">
            {clubs.map((club) => (
                <ClubItem
                    id={club.id}
                    description={club.data().description}
                    name={club.data().name}
                    clubImg={club.data().profileImage}
                    createdAt={club.data().createdAt}
                    updatedAt={club.data().updatedAt}
                />
            ))}
        </div>
    );
}

export default ClubList
