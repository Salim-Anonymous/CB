import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import type { NextPage } from 'next'
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import UserRequests from '../../../components/club/UserRequests';
import Header from "../../../components/Header";
import { db } from '../../../firebase';

const Members: NextPage = () => {

    const router = useRouter();
    const [members, setMembers] = useState([]);
    const clubId = router.query.id;

    //get members
    useEffect(() => {
        const data = onSnapshot(
            query(collection(db, 'clubs', `${clubId}`, 'members'), orderBy('timestamp', 'desc')),
            snapshot => {
                setMembers(snapshot.docs);
            })
        return () => { data() }
    }, [clubId]);

    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
            <Head>
                <title>Club Book</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/*Header*/}
            <Header />
            {/* Requests */}
            <div className='pt-10 pl-64 pr-64'>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-semibold'>Members</h1>
                    </div>
                    <div className='flex flex-col mt-4'>
                        {members.map((member) => (
                            <div key={member.id} className='flex items-center space-x-2 mb-5'>
                                <img className='rounded-full h-10' src={member.data().userImg} alt='' />
                                <p className='font-semibold'>{member.data().username}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>);
}

export default Members