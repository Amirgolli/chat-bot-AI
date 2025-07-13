// components/Layout.tsx
import React, { ReactNode } from "react";
import Head from "next/head";

import "./globals.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <title>Chat bot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
