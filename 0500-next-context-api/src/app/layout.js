import Head from "next/head";
import Body from "@/components/shared/content";
import "./globals.css"

export const metadata = {
  title: "Turvo",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <Head>
        <title>Turvo | Main</title>
      </Head>
      <Body>{children}</Body>
    </html>
  );
}

export const dynamic = "error";
