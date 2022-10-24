import { ChatIcon, BookmarkIcon, DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "../Post";
import ClubPost from "./ClubPost";

function ClubPosts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const data = onSnapshot(
            query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
            snapshot => {
                setPosts(snapshot.docs);
            })

        return () => { data() }
    }, []);

    console.log(posts)

    return (
        <div className="">
            <div>
                Cover
            </div>
            {posts.map((post) => (
                <ClubPost
                    key={post.id}
                    id={post.id}
                    username={post.data().username}
                    userImg={post.data().profilePic}
                    img={post.data().image}
                    caption={post.data().caption}
                />
            ))}
        </div>
    );
}

export default ClubPosts
