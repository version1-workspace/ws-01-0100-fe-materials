import { useRef, useState, useMemo } from "react";
import { TextInput, DateInput } from "../input";
import styles from './index.module.sass';

export default function EditableField({ children, type, defaultValue, className, onEdit }) {
  const ref = useRef(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const component = useMemo(
    () =>
      ({
        text: (
          <TextInput
            ref={ref}
            className={className}
            placeholder="タスク名を入力"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              setEditing(false);
              onEdit(value);
            }}
          />
        ),
        date: (
          <DateInput
            ref={ref}
            className={className}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              setEditing(false);
              onEdit(value);
            }}
          />
        ),
      })[type],
    [type, value, className, onEdit],
  );

  return (
    <div
      className={[styles.editableField, className].join(" ")}
      onClick={() => {
        setEditing(true);
        setTimeout(() => {
          ref.current.focus();
          if (type === "date") {
            ref.current.showPicker();
          }
        }, 300);
      }}
    >
      <div
        className={editing ? styles.show : styles.hide}
      >
        {component}
      </div>
      <div
        className={editing ? styles.hide : styles.show}
      >
        {children}
      </div>
    </div>
  );
}
