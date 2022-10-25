import { doc, getDoc } from 'firebase/firestore';
import type { NextPage } from 'next'
import Head from "next/head";
import { useRouter } from 'next/router';
import ActivityModal from '../../components/club/ClubActivityModal';
import ClubFeed from '../../components/club/ClubFeed';
import Header from "../../components/Header";
import { db } from '../../firebase';

const Home: NextPage = () => {

    const router = useRouter();
    const clubId = router.query.id;

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
      </div>);
}

export default Home
