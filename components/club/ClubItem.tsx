import { ChatIcon, BookmarkIcon, DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "../Post";

function ClubItem(
    {
        id,
        name,
        description,
        clubImg,
        createdAt,
        updatedAt
    }: {
        id: string,
        description: string,
        name: string,
        clubImg: string,
        createdAt: string,
        updatedAt: string
    }
) {

    const { data: session } = useSession();

    return (
        <div className="flex flex-col md:flex-row bg-white my-7 border rounded-md p-5">
            {/* Img */}
            <img src={clubImg} alt="" className="object-cover w-48 md:w-64 m-10 rounded-full " />
            {/* description */}
            <div className="flex flex-col items-center justify-center w-full">
                <div
                    onClick={() => router.push(`/club/${id}`)}
                    className="m-5 text-2xl md:text-4xl cursor-pointer">
                    {name}
                </div>
                <div
                    className="inline-flex justify-center w-full rounded-md border m-10
                    border-transparent shadow-sm px-4 py-2 bg-black text-base
                    font-medium text-white hover:bg-green-600 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm
                    disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    onClick={() => { console.log(id) }}
                >
                    Join
                </div>
            </div>

        </div>
    );
}

export default ClubItem
