import type { Metadata } from "next";
import "./globals.css";
import SidePanel from "./components/side-panel/side-panel";

export const metadata: Metadata = {
  title: "Sloth Experimental",
  description: "Experimental app for Sloth to design admin UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidePanel />
        {children}
      </body>
    </html>
  );
}
