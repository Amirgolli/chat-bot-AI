"use client";

import React, { ReactNode } from "react";
import Head from "next/head";
import { SidebarProvider, useSidebar } from "./components/sidebar/SidebarContext";
import SideBar from "./components/sidebar/index";

import "./globals.css";

type LayoutProps = {
  children: ReactNode;
};

const LayoutContent = ({ children }: LayoutProps) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-80" : "md:ml-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" >
      <Head>
        <meta charSet="UTF-8" />
        <title>Chat bot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <SidebarProvider>
          <LayoutContent>{children}</LayoutContent>
        </SidebarProvider>
      </body>
    </html>
  );
};

export default Layout;