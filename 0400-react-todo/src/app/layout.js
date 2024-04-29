import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.sass";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo",
  description: "React Todo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className={styles.header}>
          <h1 className={styles.logo}>{metadata.title}</h1>
        </header>
        {children}
        <footer className={styles.footer}>
        </footer>
      </body>
    </html>
  );
}
