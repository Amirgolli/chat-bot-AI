"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import HeaderComponent from "@/app/components/header";
import SendSvg from "../../../../public/svg/send";
import Modal from "@/app/components/Model";

interface Message {
  role: "user" | "assistant";
  content: string;
  id?: number;
}

interface SendMessageRequest {
  content: string;
}

export default function ChatPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { session_id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const { register, handleSubmit, reset } = useForm<SendMessageRequest>();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!session_id || session_id === "undefined") {
          throw new Error("session id is incorrect.");
        }
        const token = localStorage.getItem("token");
        if (!token) throw new Error("please first log in");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/get_history/${session_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok)
          throw new Error(`error for get history: ${response.status}`);

        const history = await response.json();
        const historyWithIds = history.map((msg: Message, index: number) => ({
          ...msg,
          id: index,
        }));
        setMessages(historyWithIds);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        setErrorMessage(errorMessage);
      }
    };

    if (session_id) fetchHistory();
  }, [session_id]);

  const onSubmit = async (data: SendMessageRequest) => {
    try {
      if (!session_id || session_id === "undefined") {
        // Changed: Uncommented to restore session_id check
        throw new Error("session id is incorrect");
      }
      const token = localStorage.getItem("token"); // Changed: Uncommented to restore token check
      if (!token) throw new Error("please first login");

      const response = await fetch(
        // Changed: Uncommented to restore API call
        `${process.env.NEXT_PUBLIC_API_URL}/chat/send_message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ session_id, content: data.content }),
        }
      );

      if (!response.ok)
        // Changed: Uncommented to restore response check
        throw new Error(`error for send your message: ${response.status}`);

      const result = await response.json();
      // const result = "this is a test message"; // Changed: Commented out test message
      setMessages([
        ...messages,
        { role: "user", content: data.content, id: messages.length },
        { role: "assistant", content: result.response },
        // { role: "assistant", content: result, id: messages.length + 1 }, // Changed: Commented out test message response
      ]);
      reset();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      setErrorMessage(errorMessage);
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className="flex h-screen bg-gray-100 mt-19">
        {/* Chat Area */}
        <div className="w-full p-4 flex flex-col h-screen pb-20">
          <div className="flex-1 overflow-y-auto">
            <h1 className="text-center text-[20px] font-semibold italic md:text-2xl">
              به صفحه چت خوش آمدید،چطور میتوانم کمک تان کنم؟
            </h1>
            {messages.map((message) => (
              <div
                key={message.id ?? messages.indexOf(message)}
                className={`flex items-start ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "user" ? (
                  <>
                    <div
                      className={`p-3 rounded-lg max-w-xs bg-[#4F46E5] text-white`}
                    >
                      {message.content.includes("http") ? (
                        <a
                          href={message.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {message.content}
                        </a>
                      ) : (
                        message.content
                      )}
                      <div className="text-xs text-gray-400 mt-1">03:27 PM</div>
                    </div>
                    <div className="flex-shrink-0 ml-2 mb-40">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        U
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-shrink-0 mr-2 mb-40">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        SL
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-lg max-w-xs bg-white text-left`}
                    >
                      {message.content.includes("http") ? (
                        <a
                          href={message.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {message.content}
                        </a>
                      ) : (
                        message.content
                      )}
                      <div className="text-xs text-gray-400 mt-1">03:27 PM</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col fixed bottom-6 left-5 md:left-80 right-5 md:right-80 p-4 bg-white h-35 border border-[#E2E8F0] rounded-2xl inset-shadow-[#10182808] shadow-2xs"
          >
            <input
              {...register("content", {
                required: "you should write something",
              })}
              placeholder="Message to Slothpilot..."
              className="flex-1 p-2 rounded-lg mr-2 outline-0"
            />
            <div className="self-end">
              <button
                type="submit"
                className="p-2 bg-[#4F46E5] text-white rounded-lg flex items-center gap-3"
              >
                Send
                <SendSvg />
              </button>
            </div>
          </form>
        </div>
        <Modal
          errorMessage={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      </div>
    </>
  );
}
