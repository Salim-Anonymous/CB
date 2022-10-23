import React, { useEffect, useState } from 'react'
import {faker, SexType} from "@faker-js/faker";
type SubscriptionTier = 'free' | 'basic' | 'business';

class User {
    _id: string | undefined;
    avatar: string;
    birthday: Date;
    email: string;
    firstName: string;
    lastName: string;
    sex: SexType;
    subscriptionTier: SubscriptionTier;
}

function createRandomUser(): User {
    return {
        _id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sex: faker.name.sexType(),
        subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
    };
}


export default function Suggestions() {

  const [suggestions,setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => createRandomUser());
    setSuggestions(suggestions);
  }, []);
  return (
    <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Suggestions For You</h3>
                <button className='text-gray-600 font-semibold'>See All</button>
            </div>
            {suggestions.map((profile: User) => (
                <div key={profile._id} className='flex items-center justify-between mt-3'>
                    <img className='w-10 h-10 rounded-full border p-[2px] border-blue-500' src={profile.avatar} alt='' />
                    <div className='flex-1 mx-4'>
                        <h2 className='font-semibold text-sm'>{profile.firstName}</h2>
                        <h3 className='text-xs text-gray-400'>Works at {profile.subscriptionTier}</h3>
                    </div>
                    <button className='text-blue-400 text-xs font-semibold'>Follow</button>
                    </div>
            ))}
    </div>
  )
}
