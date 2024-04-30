"use client";
import Button from "../button";
import { TextInput, DateInput } from "../input";
import styles from "./index.module.sass";
import AppDate from "../../lib/date";

export default function Form({ data, onChange, onSubmit }) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
    >
      <div className={styles.formGroup}>
        <div className={[styles.inputForm, styles.inputFormName].join(" ")}>
          <label className={styles.inputLabel}>タスク</label>
          <TextInput
            className={styles.inputField}
            type="text"
            value={data.name}
            placeholder="タスク名を入力"
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>
        <div className={styles.inputForm}>
          <label className={styles.inputLabel}>期限日</label>
          <DateInput
            className={styles.inputField}
            type="date"
            value={data.deadline?.toString()}
            placeholder="タスク名を入力"
            onChange={(e) => onChange({ deadline: AppDate.parse(e.target.value) })}
          />
        </div>
      </div>
      <div className={styles.formFooter}>
        <Button variant="primary">追加</Button>
      </div>
    </form>
  );
}
