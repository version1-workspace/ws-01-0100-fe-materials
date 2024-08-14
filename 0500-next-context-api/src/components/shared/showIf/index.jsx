import styles from "./index.module.css";

const defaultPlaceholder = "XXXXXXXXXXXXXXXXX";

export default function ShowIf({ value, placeholder, children }) {
  return (
    <div className={value ? styles.show : styles.hide}>
      {value ? children : defaultPlaceholder || placeholder}
    </div>
  );
}
