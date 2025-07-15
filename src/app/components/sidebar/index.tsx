"use client";

import Image from "next/image";
import { useSidebar } from "./SidebarContext";
import DownSvg from "../../../../public/svg/down";
import PlusSvg from "../../../../public/svg/plus";
import { useState } from "react";
import DeleteSvg from "../../../../public/svg/delete";
import RenameSvg from "../../../../public/svg/rename";
const SideBar = () => {
  const [chats, setChats] = useState<string[]>([]);
  const openNewChat = (): void => {
    setChats([...chats, `this is chat ${chats.length + 1}`]);
  };
  const deleteChat = (index: number) => {
    setChats(chats.filter((_, i) => i !== index));
  };
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="hidden md:block fixed top-240 left-4 z-150 btn btn-primary"
      >
        {isSidebarOpen ? "Close" : "Open"}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white text-white transition-transform duration-300 ease-in-out z-100 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-2 mt-5">
          <div className="flex gap-17">
            <Image
              width={40}
              height={40}
              alt="logo"
              src={"/images/Logo.png"}
              className=""
            />

            <button type="button" className="" onClick={openNewChat}>
              <PlusSvg />
            </button>
          </div>

          <div className="collapse text-[#1E293B] mt-5">
            <input type="checkbox" />
            <div className="collapse-title font-semibold text-[18px] flex justify-between items-center">
              <span>Chats</span>
              <div className="flex gap-2 items-center">
                <DownSvg />
              </div>
            </div>
            <div className="collapse-content      font-medium cursor-pointer text-[16px] ">
              {chats.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <h3
                    // bg-[#EEF2FF] border-l-[4px] border-[#4F46E5]
                    className="text-[16px] text-[#1E293B] mb-2 p-2  "
                  >
                    {item}
                  </h3>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => deleteChat(index)}>
                      <DeleteSvg />
                    </button>
                    <button type="button">
                      <RenameSvg />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
