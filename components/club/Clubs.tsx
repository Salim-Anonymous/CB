import Posts from "../Posts";
import MiniProfile from "../MiniProfile";
import Suggestions from "../suggestions";
import { useSession } from "next-auth/react";
import ClubList from "./ClubList";

function Clubs() {

    const { data: session } = useSession();

    return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl
         xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/* Section */}
            <section className="col-span-2">
                {/* Stories */}
                {/* <Stories /> */}
                {/* Posts */}
                <ClubList />
            </section>
            {/* Section */}
            <section className="hidden xl:inline-grid md col-span-1">
            {session && (
                    <>

                <div className="fixed t-20">
                    {/* Mini Profile */}
                    <MiniProfile />

                    {/* Suggestions */}
                    <Suggestions />
                </div>
                </>)}
            </section>
        </main>
    );
}

export default Clubs
