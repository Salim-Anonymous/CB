import { ChatIcon, BookmarkIcon, DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "../Post";
import ClubPost from "./ClubPost";

function ClubPosts({clubId}:{clubId:any}) {

    const [posts, setPosts] = useState([]);
    const [club,setClub] = useState({});

    useEffect(() => {
        const data = onSnapshot(
            query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
            snapshot => {
                setPosts(snapshot.docs);
            })

        return () => { data() }
    }, []);

    useEffect(() => {
        const docRef = doc(db, "clubs", `${clubId}`);
        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                setClub(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        ).catch((error) => {
            console.log("Error getting document:", error);
        }
        );
    }, [clubId, db]);
    console.log(club);
    return (
        <div className="">
            {/**Making cover for the page */}
            <div className="bg-cover bg-center h-96 w-full" style={{ backgroundImage: "url('https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=')" }}></div>
            <div className="flex justify-center -mt-10 md:-mt-40">
                <img src="https://india.acm.org/images/acm_rgb_grad_pos_diamond.png" alt="" className="h-24 w-24 md:h-64 md:w-64 rounded-full border-4 border-green-200 object-cover" />
            </div>
            <div className="flex justify-center">
                <div className="text-center">
                    {/*@ts-ignore*/}
                    <h1 className="text-3xl font-semibold">{club.name}</h1>
                    {/*@ts-ignore*/}
                    <h3 className="text-xl font-semibold">{club.description}</h3>
                </div>
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
