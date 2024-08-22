import { useEffect, useRef, useState } from "react";
import styles from "@/components/shared/select/index.module.css";
import { classHelper, join } from "@/lib/cls";
import Icon from "../icon";

export default function Select({
  data,
  value,
  defaultOption,
  onSelect,
  containerStyleClass,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (!open) {
        return;
      }

      if (
        ref.current?.contains(e.target)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("click", close);

    return () => {
      document.removeEventListener("click", close);
    };
  }, [open]);

  const valueItem = data.find((it) => it.value === value);

  return (
    <div
      ref={ref}
      className={join(styles.container, containerStyleClass)}
      onClick={() => setOpen((open) => !open)}>
      <div className={styles.valueContainer}>
        <p className={styles.value}>
          {valueItem?.label || defaultOption.label}
        </p>
        <Icon name="caretDown" />
      </div>
      <div
        className={classHelper({
          [styles.pullDownContainer]: true,
          [styles.pullDownShow]: open,
        })}>
        <ul className={styles.pullDown}>
          {data.map((item) => {
            return (
              <li
                key={item.value}
                className={styles.option}
                value={item.value}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  if (onSelect) {
                    onSelect(item);
                  }
                }}>
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}