import styles from "./textarea.module.css";

export default function TextArea({
  value,
  rows = 10,
  placeholder,
  onChange,
}) {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
