"use client";

import Image from "next/image";
import { useSidebar } from "./SidebarContext";
import DownSvg from "../../../../public/svg/down";
import PlusSvg from "../../../../public/svg/plus";
import DeleteSvg from "../../../../public/svg/delete";
import RenameSvg from "../../../../public/svg/rename";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface Chat {
  session_id: string;
  title: string;
}

export default function SideBar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const router = useRouter();

  const openNewChat = async () => {
    try {
      const token = localStorage.getItem("token");
      const newSessionId = uuidv4();
      console.log("Sending to /send_message:", {
        session_id: newSessionId,
        content: "start",
        token,
      });
      if (!token) throw new Error("first log in");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/send_message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            session_id: newSessionId,
            content: "start",
          }),
        }
      );

      if (!response.ok) throw new Error(`error for start chat: ${response.status}`);

      const result = await response.json();
      console.log("Response from /send_message:", result);

      if (!result.session_id || result.session_id === "undefined") {
        throw new Error("your session is incorrect ");
      }

      setChats([
        ...chats,
        { session_id: result.session_id, title: `chats ${chats.length + 1}` },
      ]);

      router.push(`/chat/${result.session_id}`);
    } catch (error) {
      console.error("Error in openNewChat:", error);
      alert(error.message || "error for start app");
    }
  };

  const deleteChat = (index: number) => {
    setChats(chats.filter((_, i) => i !== index));
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className=" fixed top-220 md:top-240 left-4 z-150 btn btn-primary"
      >
        {isSidebarOpen ? "close" : "open"}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-60 md:w-80 bg-white text-white transition-transform duration-300 ease-in-out z-100 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-2 mt-5">
          <div className="flex gap-17">
            <Image
              width={40}
              height={40}
              alt="logo"
              src="/images/Logo.png"
              className=""
            />
            
            <button type="button" onClick={openNewChat}>
              <PlusSvg />
            </button>
          </div>
          <div className="collapse text-[#1E293B] mt-5">
            <input type="checkbox" />
            <div className="collapse-title font-semibold text-[18px] flex justify-between items-center">
              <span>chats</span>
              <div className="flex gap-2 items-center">
                <DownSvg />
              </div>
            </div>
            <div className="collapse-content font-medium cursor-pointer text-[16px]">
              {chats.map((chat, index) => (
                <div
                  key={chat.session_id}
                  className="flex justify-between items-center"
                >
                  <Link
                    href={`/chat/${chat.session_id}`}
                    className="text-[16px] text-[#1E293B] mb-2 p-2 hover:bg-[#EEF2FF] border-l-[4px] border-[#4F46E5]"
                  >
                    {chat.title}
                  </Link>
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
}

