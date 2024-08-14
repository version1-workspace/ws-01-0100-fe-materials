import styles from "@/components/project/card/index.module.css";
import Icon from "@/components/shared/icon";

export default function Projet({ data }) {
  return (
    <div key={data.slug} className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{data.name}</h2>
        <div className={styles.deadline}>
          <span>
            <Icon name="calendar" size="10px" />
          </span>
          <p>{data.deadline.format()}</p>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.goal}>
          <span>ゴール : </span>
          <p>{data.goal}</p>
        </div>
        {data.shouldbe ? (
          <div className={styles.shouldbe}>
            <span>あり方 : </span>
            <p>{data.shouldbe}</p>
          </div>
        ) : null}
      </div>
      <div className={styles.footer}>
        <div className={styles.stats}>
          <div className={styles.milestone}>
            <span className={styles.icon}>
              <Icon name="milestone" size="12px" />
            </span>
            <span className={styles.statsText}>
              {data.stats?.kinds.milestone || 0}
            </span>
          </div>
          <div className={styles.task}>
            <span className={styles.icon}>
              <Icon name="task" size="12px" />
            </span>
            <span className={styles.statsText}>{data.stats?.kinds.task}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
