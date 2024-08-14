"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { classHelper } from "@/lib/cls";

export default function PopupMenu({ trigger, actions }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const listener = (e) => {
      const ele = e.target
      const parent = ele?.closest("." + styles.container);
      if (!parent) {
        setShow(false);
      }
    };
    document.body.addEventListener("click", listener);

    return () => {
      document.body.removeEventListener("click", listener);
    };
  }, [show]);

  return (
    <div className={styles.container}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShow(true);
        }}>
        {trigger}
      </div>
      {show ? (
        <div className={styles.popupMenu}>
          <p className={styles.title}>アクション</p>
          <ul className={styles.content}>
            {(actions || []).map((it, index) => {
              return (
                <li
                  key={it.text}
                  onClick={() => {
                    it.onClick();
                    setShow(false);
                  }}>
                  <div
                    className={classHelper({
                      [styles.action]: true,
                      [styles.danger]: it.danger,
                      [styles.lastAction]: index == actions.length - 1,
                    })}>
                    {it.logo}
                    <p className={styles.text}>{it.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
