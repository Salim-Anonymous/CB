import Posts from "../Posts";
import MiniProfile from "../MiniProfile";
import Suggestions from "../suggestions";
import { useSession } from "next-auth/react";
import ClubList from "./ClubList";
import ClubPosts from "./ClubPosts";
import Members from "./members";

function ClubFeed({clubId}:{clubId:string|string[]}) {

    const { data: session } = useSession();

    return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl
         xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/* Section */}
            <section className="col-span-2">
                {/* Stories */}
                {/* <Stories /> */}
                {/* Posts */}
                <ClubPosts clubId={clubId}/>
            </section>
            {/* Section */}
            <section className="hidden xl:inline-grid md col-span-1">
                <div className="fixed t-20">
                    {/* Mini Profile */}
                    <MiniProfile />

                    {/* Suggestions */}
                    <Suggestions />
                    <Members />
                </div>
            </section>
        </main>
    );
}

export default ClubFeed
