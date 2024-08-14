import styles from "./layout.module.css";
import { classHelper } from "@/lib/cls";

const menuSettings = [
  {
    title: "ユーザ情報",
    key: "profile",
  },
  {
    title: "認証情報",
    key: "auth",
  },
  {
    title: "支払い情報",
    key: "payment",
  },
  {
    title: "設定",
    key: "settings",
    children: [
      {
        title: "デザイン",
        key: "settings/design",
      },
      {
        title: "通知",
        key: "settings/notification",
      },
    ],
  },
];

export default function UsersLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>プロフィール・設定</h1>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <ul className={styles.menu}>
              {menuSettings.map((it) => {
                return (
                  <li key={it.key}>
                    <p
                      className={classHelper({
                        [styles.menuItem]: true,
                      })}
                    >
                      {it.title}
                    </p>
                    {it.children ? (
                      <ul className={styles.subMenu}>
                        {it.children.map((child) => {
                          return (
                            <li key={child.key}>
                              <p
                                className={classHelper({
                                  [styles.menuItem]: true,
                                  [styles.subMenuItem]: true,
                                })}
                              >
                                {child.title}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.main}>{children}</div>
        </div>
      </div>
    </div>
  );
}
