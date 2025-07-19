"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SendMessageRequest {
  content: string;
}

export default function ChatPage() {
  const { session_id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const { register, handleSubmit, reset } = useForm<SendMessageRequest>();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!session_id || session_id === "undefined") {
          throw new Error("شناسه سشن نامعتبر است. لطفاً از سایدبار چت را انتخاب کنید.");
        }
        const token = localStorage.getItem("token");
        if (!token) throw new Error("لطفاً ابتدا وارد شوید");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/get_history/${session_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error(`خطا در دریافت تاریخچه: ${response.status}`);

        const history = await response.json();
        setMessages(history);
      } catch (error) {
        alert(error.message || "خطا در دریافت تاریخچه");
      }
    };

    if (session_id) fetchHistory();
  }, [session_id]);

  const onSubmit = async (data: SendMessageRequest) => {
    try {
      if (!session_id || session_id === "undefined") {
        throw new Error("شناسه سشن نامعتبر است. لطفاً از سایدبار چت را انتخاب کنید.");
      }
      const token = localStorage.getItem("token");
      if (!token) throw new Error("لطفاً ابتدا وارد شوید");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/send_message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ session_id, content: data.content }),
      });

      if (!response.ok) throw new Error(`خطا در ارسال پیام: ${response.status}`);

      const result = await response.json();
      setMessages([...messages, { role: "user", content: data.content }, { role: "assistant", content: result.response }]);
      reset();
    } catch (error) {
      alert(error.message || "خطا در ارسال پیام");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <h1 className="text-2xl font-bold">چت {session_id}</h1>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.role === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"
              }`}
            >
              <span>{msg.content}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <input
            {...register("content", { required: "پیام الزامی است" })}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="پیام خود را بنویسید..."
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
}