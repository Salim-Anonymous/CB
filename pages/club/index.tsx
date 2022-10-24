import type { NextPage } from 'next'
import Head from "next/head";
import Clubs from '../../components/club/Clubs';
import ClubList from '../../components/club/ClubList';
import Feed from '../../components/Feed';
import Header from "../../components/Header";
import Modal from '../../components/Modal';


const Home: NextPage = () => {
  return (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
          <Head>
                <title>Club Book</title>
                <link rel="icon" href="/favicon.ico" />
          </Head>
          {/*Header*/}
          <Header/>
          {/*Club Feed*/}
          <Clubs />
      </div>);
}

export default Home
