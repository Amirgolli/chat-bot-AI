"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r">
        <h2 className="text-xl font-bold">SL</h2>
        <p className="text-sm text-gray-500">Select One of Them:</p>
        <div className="flex space-x-2 mt-2">
          <button className="px-3 py-1 bg-purple-500 text-white rounded">
            one
          </button>
          <button className="px-3 py-1 bg-purple-500 text-white rounded">
            two
          </button>
          <button className="px-3 py-1 bg-purple-500 text-white rounded">
            three
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex-shrink-0 mr-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {message.role === "assistant" ? "SL" : "U"}
                </div>
              </div>
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  message.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-white text-left"
                }`}
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
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex items-center mt-4">
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
