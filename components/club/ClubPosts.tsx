import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import ClubPost from "./ClubPost";

function ClubPosts({ clubId }: { clubId: any }) {

    const [posts, setPosts] = useState([]);
    const [club, setClub] = useState({});
    const [activities, setActivities] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const data = onSnapshot(
            query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
            snapshot => {
                setPosts(snapshot.docs);
            })

        return () => { data() }
    }, []);

    useEffect(() => {
        const data = onSnapshot(
            query(collection(db, 'clubs', `${clubId}`, 'activities'), orderBy('scheduledTime', 'desc')),
            snapshot => {
                setActivities(snapshot.docs);
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
    console.log(activities);
    return (
        <div className="">
            {/**Making cover for the page */}
            <div className="bg-cover bg-center h-96 w-full" style={{ backgroundImage: "url('https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=')" }}></div>
            <div className="flex justify-center -mt-10 md:-mt-40">
                {/*@ts-ignore*/}
                <img src={club.profileImage} alt="" className="h-24 w-24 md:h-64 md:w-64 rounded-full border-4 border-green-200 object-cover" />
            </div>
            {/* button to route to memeber requests */}
            <div className="flex justify-center">
                <div className="text-center">
                    {/*@ts-ignore*/}
                    <h1 className="text-3xl font-semibold">{club.name}</h1>
                    {/*@ts-ignore*/}
                    <h3 className="text-xl font-semibold">{club.description}</h3>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={() => { router.push(`/club/${clubId}/requests`) }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mt-4">Member Requests</button>
                <button
                    onClick={() => { router.push(`/club/${clubId}/members`) }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mt-4">See Members</button>
                <button
                    onClick={() => { router.push(`/club/${clubId}/members`) }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mt-4">Create Activity</button>
                <button
                    onClick={() => { router.push(`/club/${clubId}/members`) }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mt-4">Create News Feed</button>
            </div>
            {/* @ts-ignore */}
            {activities.map((activity) => (<ClubPost key={activity.id} id={activity.id} clubId={`${clubId}`} username={activity.data().name} userImg={club.profileImage}
                img={activity.data().image}
                caption={activity.data().description}
            />
            ))}
        </div>
    );
}

export default ClubPosts
