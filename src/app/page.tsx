"use client";

import { useChat } from "@ai-sdk/react";
// import { useState } from "react";
import HeaderComponent from "./components/header";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm your personal Assistant Slothpilot. It's 03:27 PM CEST on Monday, July 14, 2025.",
      },
      {
        id: "2",
        role: "user",
        content:
          "Do Androids Dream of Electric Sheep? It's a 1968 dystopian science fiction novel by American writer Philip K. Dick, set in a post-apocalyptic Earth. San Francisco, the story unfolds after a devastating nuclear war.",
      },
      {
        id: "3",
        role: "assistant",
        content:
          "Interesting! That sounds like a fascinating read. Androids and humans explore the uneasy coexistence, and escape to Earth, where they hope to remain undetected by their owners, and empathy ability to distinguish androids from humans, the Voigt-Kampff test making distinctions. Poor androids resort to electric robotic imitations of living animals, concealing their true nature from neighbors.",
      },
      {
        id: "4",
        role: "assistant",
        content: "External Link Title https://www.examplelink.com",
      },
      {
        id: "5",
        role: "user",
        content: "Select One of Them: one two three",
      },
    ],
  });

  return (
    <>
      <HeaderComponent />
      <div className="flex h-a bg-gray-100 mt-19">
        {/* Chat Area */}
        <div className="w-4/4 p-4 flex flex-col h-screen ">
          <div className="flex-1 overflow-y-auto m ">
            {messages.map((message) => (
              <div
                key={message.id}
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
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center space-y-2">
                        U
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-shrink-0 mr-2 mb-40">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center space-y-2">
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
          <form onSubmit={handleSubmit} className="flex items-center mt-4 ">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Message to Slothpilot..."
              className="flex-1 p-2 border rounded-lg mr-2"
              disabled={status !== "ready"}
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
              disabled={status !== "ready"}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
