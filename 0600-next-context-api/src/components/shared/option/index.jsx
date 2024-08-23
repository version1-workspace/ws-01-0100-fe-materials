import styles from "@/components/shared/option/index.module.css";
import { classHelper } from "@/lib/cls";

export default function Option({ data, value, onSelect }) {
  return (
    <ul className={styles.container}>
      {data.map((item, index) => {
        return (
          <li key={item.value}>
            <span
              className={classHelper({
                [styles.optionItem]: true,
                [styles.optionItemLast]: index === data.length - 1,
                [styles.optionItemFirst]: index === 0,
                [styles.active]: item.value === value
              })}
              onClick={() => onSelect && onSelect(item)}
            >
              {item.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
