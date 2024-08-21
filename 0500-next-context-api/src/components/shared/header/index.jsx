"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./index.module.css";
import { useModal } from "@/lib/modal";
import TaskForm from "@/components/tasks/form";
import Icon from "../icon";
import useTasks from "@/contexts/tasks";
import Search from "@/components/tasks/search";

const user = {
  username: "test",
  email: "test@example.com",
};

function Dropdown({ trigger }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.dropdownContainer}>
      {show ? (
        <div className={styles.overlay} onClick={() => setShow(false)}></div>
      ) : null}
      <div className={styles.trigger} onClick={() => setShow(true)}>
        {trigger}
      </div>
      {show ? (
        <ul className={styles.dropdown}>
          <li
            className={styles.dropdownItem}
            onClick={() => {
              setShow(false);
            }}
          >
            <div className={styles.userInfo}>
              <p className={styles.username}>{user.username}</p>
              <p className={styles.email}>{user.email}</p>
            </div>
          </li>
          <li>
            <div className={styles.border}></div>
          </li>
          <li
            className={styles.dropdownItem}
            onClick={() => {
              setShow(false);
            }}
          >
            <p className={styles.logout}>ログアウト</p>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default function Header() {
  const { open, hide } = useModal();
  const { fetchDefault: fetchTasks } = useTasks();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link href="/">
            <div className={styles.logo}>
              <h2>Turvo</h2>
            </div>
          </Link>
          <div className={styles.searchForm}>
            <Search />
          </div>
        </div>
        <div className={styles.right}>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Icon
                interactive="hoverDark"
                name="add"
                size={24}
                onClick={() => {
                  open({
                    content: (
                      <TaskForm
                        title="タスクを追加"
                        onSubmit={() => {
                          fetchTasks();
                          hide();
                        }}
                        onCancel={hide}
                      />
                    ),
                  });
                }}
              />
            </li>
            <li className={styles.menuItem}>
              <Icon name="info" interactive="hoverDark" size={24} />
            </li>
            <li className={styles.menuItem}>
              <Icon name="notification" interactive="hoverDark" size={24} />
            </li>
          </ul>
          <div className={styles.avatarIcon}>
            <Dropdown
              trigger={
                <div className={styles.avatarCircleContaiener}>
                  <Icon name="person" interactive="hover" size={20} />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}
