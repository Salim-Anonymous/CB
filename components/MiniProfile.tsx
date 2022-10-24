import React, { useEffect, useState } from "react";
import {signOut, useSession} from "next-auth/react";

function MiniProfile() {
  const {data:session} = useSession();
  const [loading, setLoading] = useState(true);
  console.log(session);
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img src={session?.user?.image} alt="" className="w-16 h-16 rounded-full border p-[2px] border-blue-500" />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.name}</h2>
        <h2 className="font-bold text-gray-400">Welcome to CAMS</h2>
      </div>
      <button className="text-blue-400 text-sm font-semibold">Sign Out</button>
    </div>
  );
}

export default MiniProfile;