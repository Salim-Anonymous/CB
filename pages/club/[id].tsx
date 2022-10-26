import { doc, getDoc } from 'firebase/firestore';
import type { NextPage } from 'next'
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from 'react';
import AddClubModal from '../../components/AddClubModal';
import ActivityModal from '../../components/club/ClubActivityModal';
import ClubFeed from '../../components/club/ClubFeed';
import NewsFeed from '../../components/club/NewsFeedModal';
import Header from "../../components/Header";
import { db } from '../../firebase';

const Home: NextPage = () => {

    const router = useRouter();
    const clubId = router.query.id;
    const [club, setClub] = useState({});

    // get club
    const getClub = async () => {
        const docRef = doc(db, "clubs", `${clubId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setClub(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

  return (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
          <Head>
                <title>Club Book</title>
                <link rel="icon" href="/favicon.ico" />
          </Head>
          {/*Header*/}
          <Header/>
          {/* Club Page*/}
          <ClubFeed clubId={clubId}/>

          <ActivityModal />
          {/* @ts-ignore */}
          <NewsFeed clubImage={club.profileImage} clubName={club.name}/>
      </div>);
}

export default Home
