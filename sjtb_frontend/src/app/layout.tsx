import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import Footer from '@/component/footer'; // 푸터 컴포넌트 import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
