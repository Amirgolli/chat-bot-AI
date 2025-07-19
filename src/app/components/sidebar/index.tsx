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
import { v4 as uuidv4 } from "uuid"; // نیاز به نصب: npm install uuid

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

      if (!response.ok) throw new Error(`خطا در شروع چت: ${response.status}`);

      const result = await response.json();
      console.log("Response from /send_message:", result);

      if (!result.session_id || result.session_id === "undefined") {
        throw new Error("شناسه سشن نامعتبر دریافت شد");
      }

      setChats([
        ...chats,
        { session_id: result.session_id, title: `چت ${chats.length + 1}` },
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
        className="hidden md:block fixed top-240 left-4 z-150 btn btn-primary"
      >
        {isSidebarOpen ? "بستن" : "باز کردن"}
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
              <span>چت‌ها</span>
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

// ### تغییرات اعمال‌شده
// 1. **تولید `session_id` جدید**:
//    - به جای ارسال `session_id: "new"»، یه `session_id` تصادفی با `uuidv4()` تولید می‌کنیم و مستقیم می‌فرستیم. این کار باعث می‌شه بک‌اند همیشه یه سشن جدید بشناسه و مشکل محدودیت 5 پیام رو دور بزنیم.
// 2. **استفاده از `useRouter`**:
//    - بعد از دریافت پاسخ موفق از بک‌اند، با `router.push(`/chat/${result.session_id}`)` کاربر رو به صفحه چت جدید هدایت می‌کنیم.
// 3. **مدیریت خطاها**:
//    - چک می‌کنیم که `session_id` توی پاسخ بک‌اند معتبر باشه.
//    - لاگ‌های دقیق‌تری برای دیباگ اضافه کردیم.

// ---

// ### پیش‌نیازها
// 1. **نصب پکیج uuid**:
//    ```bash
//    cd front
//    npm install uuid
//    ```
// 2. **تنظیمات محیط**:
//    - مطمئن شو توی `front/.env.local` این باشه:
//      ```plaintext
//      NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
//      ```

// ---

// ### تست
// 1. **فرانت‌اند**:
//    - فایل `SideBar.tsx` رو با کد بالا جایگزین کن.
//    - سرور Next.js رو اجرا کن:
//      ```bash
//      cd front
//      npm run dev
//      ```
//    - لاگین کن، دکمه چت جدید (PlusSvg) رو بزن، و چک کن:
//      - توی کنسول (F12 > Console)، خروجی‌های `Sending to /send_message` و `Response from /send_message` رو ببین.
//      - ببین URL به `/chat/[session_id]` تغییر می‌کنه و `session_id` معتبره (مثل UUID).

// 2. **بک‌اند**:
//    - سرور رو ری‌استارت کن:
//      ```bash
//      cd back
//      uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
//      ```
//    - توی تب Network (F12 > Network)، بدنه پاسخ `/chat/send_message` رو چک کن.

// ---

// ### سوالات برای دیباگ:
// 1. خروجی کنسول برای `Response from /send_message` چیه؟ `session_id` معتبره؟
// 2. توی تب Network، بدنه پاسخ `/chat/send_message` چیه؟
// 3. URL بعد از زدن دکمه چت جدید چیه؟

// اگه درست شد، بگو «اوکی». اگه خطا گرفتی (مثل «شناسه سشن نامعتبر»)، خروجی‌های بالا رو بفرست.
