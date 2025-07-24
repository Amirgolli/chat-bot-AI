"use client";

import { useState, useEffect } from "react";
import HeaderComponent from "./components/header";

export default function ChatPage() {
  const [username, setUsername] = useState<string | null>(null); // تغییر: تعریف state برای username

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.sub);
    }
  }, []);
  return (
    <>
      <HeaderComponent />
      <div className="flex  mt-19 italic">
        <div
          className={`${
            username ? "block" : "hidden"
          } m-auto mt-100 text-[15px] md:text-2xl`}
        >
          welcome {username} ,for start chat, make a new chat with sidebar
        </div>
        <div
          className={`${
            username ? "hidden" : "block"
          } m-auto mt-100 text-[15px] md:text-2xl`}
        >
          welcome user,please first log in
        </div>
      </div>
    </>
  );
}
