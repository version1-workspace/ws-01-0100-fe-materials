import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <ul className={styles.linkList}>
        <li className={styles.linkItem}>
          <Link className={styles.link} href="/api/v1/spec">
            API Spec
          </Link>
        </li>
        <li className={styles.linkItem}>
          <Link
            className={styles.link}
            href="https://github.com/version1-workspace/ws-01-0100-fe-materials"
          >
            Repository
          </Link>
        </li>
      </ul>
    </div>
  );
}
