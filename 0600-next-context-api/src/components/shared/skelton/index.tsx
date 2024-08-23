"use client";

import styles from "./index.module.css";

export default function Skelton({ height, row, rowHeight }) {
  return (
    <div className={styles.container} style={{ height }}>
      {new Array(row || 3).fill(0).map((_, i) => (
        <div key={i} className={styles.row} style={{ height: rowHeight }} />
      ))}
    </div>
  );
}
