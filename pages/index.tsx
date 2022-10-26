import type { NextPage } from 'next'
import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from '../components/Modal';
import AddClubModal from '../components/AddClubModal';

const Home: NextPage = () => {
  return (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
          <Head>
                <title>Club Book</title>
                <link rel="icon" href="/favicon.ico" />
          </Head>
          {/*Header*/}
          <Header/>
          {/*Feed*/}
          <Feed />
          {/*Modal*/}
          <Modal />
          <AddClubModal />
      </div>);
}

export default Home
