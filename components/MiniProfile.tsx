import React, { useEffect, useState } from "react";

function MiniProfile() {

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img src="https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-1/307773031_101328909418186_6024367239630506673_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=qQ4XF2WsDfsAX_yRD_P&_nc_ht=scontent.fdel29-1.fna&oh=00_AT8oNsuyLdRzDacYSWLQdR21IPqymNPrmCZe7w_mV14deQ&oe=63599EB5" alt="" className="w-16 h-16 rounded-full border p-[2px] border-blue-500" />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">Salim</h2>
        <h2 className="font-bold text-gray-400">Welcome to CAMS</h2>
      </div>
      <button className="text-blue-400 text-sm font-semibold">Sign Out</button>
    </div>
  );
}

export default MiniProfile;