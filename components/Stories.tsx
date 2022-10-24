import {faker, SexType} from "@faker-js/faker";
import { useSession } from "next-auth/react";
import {useEffect, useState} from "react";

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


export function Stories(){
    const {data: session} = useSession();
    const [suggestions,setSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => createRandomUser());
        // @ts-ignore
        setSuggestions(suggestions);
    },[]);

    return (
        <div className="flex space-x-4 p-6 bg-white mt-8
        border-gray-200 border rounded-sm overflow-x-scroll
        scrollbar-thin scrollbar-thumb-black">
            {session?<Story username={session?.user?.username} img={session?.user?.image} />:""}
            {suggestions.map((profile: User) => (
                <Story
                    key={profile._id}
                    //ts-ignore
                    username={profile.firstName.toString()}
                    //ts-ignore
                    src={profile.avatar}
                />
            ))}
        </div>
    );
}

const Story = ({username,src}:{username:string,src:string})=>{
    return (
        <div>
            <img src={src} alt={username} className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"/>
            <p className="text-xs w-14 truncate text-center">{username}</p>
        </div>
    );
}
