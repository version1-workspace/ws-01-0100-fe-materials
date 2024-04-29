import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.sass";

export default function Checkbox({ checked, onClick }) {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={[styles.checkbox, checked ? styles.checked : ""].join(" ")}
      onClick={() => {
        onClick();
        if (!checked) {
          ref.current.classList.add(styles.checked);
        }
      }}
    >
      <FontAwesomeIcon icon={faCheck} />
      <input className={styles.checkboxInput} type="checkbox" />
    </div>
  );
}
