import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import type { NextPage } from 'next'
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import UserRequests from '../../../components/club/UserRequests';
import Header from "../../../components/Header";
import { db } from '../../../firebase';

const Requests: NextPage = () => {

  return (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
          <Head>
                <title>Club Book</title>
                <link rel="icon" href="/favicon.ico" />
          </Head>
          {/*Header*/}
          <Header/>
          {/* Requests */}
          <div className='pt-10 pl-64 pr-64'>
          <UserRequests />
          </div>
      </div>);
}

export default Requests