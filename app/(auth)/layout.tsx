import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UpDev",
  description: "Help developers tweet about new technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.className} bg-dark-1 flex justify-center items-center h-[100dvh] home-presentation`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

