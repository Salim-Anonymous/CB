import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import type { NextPage } from 'next'
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import MemberList from '../../../components/club/members';
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
            <MemberList />
        </div>);
}

export default Members