import type { NextPage } from 'next'
import Head from "next/head";
import Clubs from '../../components/club/Clubs';
import ClubList from '../../components/club/ClubList';
import Feed from '../../components/Feed';
import Header from "../../components/Header";
import Modal from '../../components/Modal';
import AddClubModal from '../../components/AddClubModal';


const Home: NextPage = () => {
  return (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
          <Head>
                <title>Clubs</title>
                <link rel="icon" href="/favicon.ico" />
          </Head>
          {/*Header*/}
          <Header/>
          {/*Club Feed*/}
          <Clubs />
      </div>);
}

export default Home
