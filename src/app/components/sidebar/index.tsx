"use client";

import Image from "next/image";
import { useSidebar } from "./SidebarContext";
import DownSvg from "../../../../public/svg/down";
import PlusSvg from "../../../../public/svg/plus";
import { useState } from "react";
const SideBar = () => {
  const [chats, setChats] = useState<string[]>([]);
  const openNewChat = (): void => {
    setChats([...chats, `this is chat ${chats.length + 1}`]);
  };
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="hidden md:block fixed top-240 left-4 z-50 btn btn-primary"
      >
        {isSidebarOpen ? "Close" : "Open"}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-white transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-2 mt-5">
          <div className="flex gap-17">
            <Image
              width={90}
              height={90}
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
                  <h3 key={index} className="text-[16px] text-[#1E293B]">
                  {item}
                </h3>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
