"use client";

import Image from "next/image";
import { useSidebar } from "./SidebarContext";
import PlusSvg from "../../../../public/svg/plus";
import DeleteSvg from "../../../../public/svg/delete";
import RenameSvg from "../../../../public/svg/rename";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import BurgerMenuSvg from "../../../../public/svg/burgermenu";

interface Chat {
  session_id: string;
  title: string;
}

export default function SideBar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const openNewChat = () => {
    try {
      const newSessionId = uuidv4();
      const newChat = {
        session_id: newSessionId,
        title: `chat ${chats.length + 1}`,
      };
      setChats([...chats, newChat]);
      router.push(`/chat/${newSessionId}`);
    } catch (error) {
      console.error("error for make chats:", error);
    }
  };

  const deleteChat = (index: number) => {
    setChats(chats.filter((_, i) => i !== index));
  };

  const renameChat = (sessionId: string, newTitle: string) => {
    setChats(
      chats.map((chat) =>
        chat.session_id === sessionId ? { ...chat, title: newTitle } : chat
      )
    );
    setEditingChatId(null);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`fixed top-4.5 left-4 z-150 ${isSidebarOpen ? "opacity-100" : " opacity-0"}`}
        aria-label={isSidebarOpen ? "close sidebar" : "open sidebar"}
      >
        <BurgerMenuSvg />
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-60 md:w-80 bg-white text-white transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-2 mt-15">
          <div className="flex justify-between items-center">
            <Link href={"/"}>
              <Image
                height={100}
                width={100}
                alt="logo"
                src={"/images/Logo.jpg"}
              />
            </Link>
            <button
              type="button"
              onClick={openNewChat}
              aria-label="make a new chat "
              className="mr-8"
            >
              <PlusSvg />
            </button>
          </div>
          <div className="collapse text-[#1E293B] mt-5">
            <input type="checkbox" />
            <div className="collapse-title font-semibold text-[18px] flex justify-between items-center">
              <span> open chats</span>
              <div className="flex gap-2 items-center"></div>
            </div>
            <div className="collapse-content font-medium cursor-pointer text-[16px]">
              {chats.map((chat, index) => (
                <div
                  key={chat.session_id}
                  className="flex justify-between items-center"
                >
                  {editingChatId === chat.session_id ? (
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onBlur={() => renameChat(chat.session_id, newTitle)}
                      autoFocus
                      className="text-[16px] text-[#1E293B] mb-2 p-2 border"
                    />
                  ) : (
                    <Link
                      href={`/chat/${chat.session_id}`}
                      className={`text-[16px] text-[#1E293B] mb-2 p-2 hover:bg-[#EEF2FF] border-l-[4px] ${
                        pathname === `/chat/${chat.session_id}`
                          ? "bg-[#EEF2FF] border-[#4F46E5]"
                          : "border-transparent"
                      }`}
                    >
                      {chat.title}
                    </Link>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => deleteChat(index)}
                      aria-label={`delete chat ${chat.title}`}
                    >
                      <DeleteSvg />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingChatId(chat.session_id);
                        setNewTitle(chat.title);
                      }}
                      aria-label={`change title ${chat.title}`}
                    >
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
