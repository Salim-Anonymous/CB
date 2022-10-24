import type { NextPage } from 'next'
import Head from "next/head";
import ClubFeed from '../../components/club/ClubFeed';
import Header from "../../components/Header";

const Home: NextPage = () => {
  return (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
          <Head>
                <title>Club Book</title>
                <link rel="icon" href="/favicon.ico" />
          </Head>
          {/*Header*/}
          <Header/>
          {/* Club Page*/}
          <ClubFeed />
      </div>);
}

export default Home
