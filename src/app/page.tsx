"use client";

import { useState, useEffect } from "react";
import HeaderComponent from "./components/header";
import Link from "next/link";

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
          } m-auto mt-100 m-text-[15px] md:text-2xl flex flex-col items-center text-center `}
        >
          <h1>خوش آمدید {username} جناب</h1>
          برای شروع چت روی آیکون اضافه کردن چت از طریق سایدبار اقدام کنید
        </div>
        <div
          className={`${
            username ? "hidden" : "block"
          } m-auto mt-100 text-[30px] md:text-4xl flex flex-col`}
        >
          سلام خوش آمدید
          <div className="flex justify-evenly mt-5">
            <Link href={"/signup"}>
              <button
                type="button"
                className=" cursor-pointer p-2 bg-blue-500 rounded-2xl text-white text-2xl"
              >
                عضویت
              </button>
            </Link>
            <Link href={"/login"}>
              <button
                type="button"
                className=" cursor-pointer p-2 bg-blue-500 rounded-2xl text-white text-2xl"
              >
                ورود
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={`${username ? "hidden" : "block"}`}></div>
    </>
  );
}
