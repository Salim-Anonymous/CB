import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';

export default function Members() {

  const [myClubs, setMyClubs] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  // get the clubs that the user is a member of
  useEffect(() => {
    const data = onSnapshot(
      //check if user has the club
      // @ts-ignore
      query(collection(db, 'users', `${session?.user?.uid}`, 'clubs'), orderBy('timestamp', 'desc')),
      snapshot => {
        setMyClubs(snapshot.docs);
      })
    return () => { data() }
  }, []);


  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between text-sm mb-5'>
        <h3 className='text-sm font-bold text-gray-400'>Your Clubs</h3>
      </div>
      {myClubs.map((profile) => (
        <div key={profile.id} onClick={()=>{router.push(`/club/${profile.id}`)}} className='flex items-center justify-between cursor-pointer mt-3'>
          <img className='w-10 h-10 rounded-full border p-[2px] border-blue-500' src={profile.data().clubImg} alt='' />
          <div className='flex-1 mx-4'>
            <h2 className='font-semibold text-sm'>{profile.data().clubName}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}
