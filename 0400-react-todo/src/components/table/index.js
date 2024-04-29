import { useRef } from "react";
import styles from "./index.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AppDate from "../../lib/date";
import { validate } from "../../lib/validator";
import Checkbox from "../checkbox";
import EditableField from "../editableField";

export default function Table({
  data,
  setting,
  onComplete,
  onChangeSetting,
  onEdit,
  onDelete,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.setting}>
        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              onChangeSetting({ showCompleted: e.target.checked });
            }}
          />
          完了タスクを表示
        </label>
      </div>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderCell}></div>
        <div
          className={[styles.tableHeaderCell, styles.tableHeaderCellTask].join(
            " ",
          )}
        >
          タスク
        </div>
        <div className={styles.tableHeaderCell}>期限日</div>
        <div className={styles.tableHeaderCell}></div>
      </div>
      <div className={styles.tableBody}>
        {data.map((row) => (
          <Row
            key={row.id}
            data={row}
            setting={setting}
            onComplete={onComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

function Row({ data, setting, onComplete, onEdit, onDelete }) {
  const ref = useRef(null);

  return (
    <div ref={ref} className={styles.tableRow}>
      <div className={[styles.tableCell, styles.tableCellCenter].join(" ")}>
        <Checkbox
          checked={data.completed}
          onClick={() => {
            if (setting.showCompleted) {
              onComplete(data);
            } else {
              setTimeout(() => {
                onComplete(data);
              }, 800);
              ref.current.classList.add(styles.completedRow);
            }
          }}
        />
      </div>
      <div className={[styles.tableCell, styles.tableCellTask].join(" ")}>
        <EditableField
          type="text"
          defaultValue={data.name}
          onEdit={(value) => {
            const task = { ...data, name: value };
            const error = validate(task);
            if (error) {
              alert(error);
              return;
            }

            onEdit(task);
          }}
        >
          {data.name}
        </EditableField>
      </div>
      <div className={styles.tableCell}>
        <EditableField
          type="date"
          defaultValue={data.deadline.toString()}
          onEdit={(value) => {
            const task = { ...data, deadline: AppDate.parse(value) };
            const error = validate(task);
            if (error) {
              alert(error);
              return;
            }

            onEdit(task);
          }}
        >
          {data.deadline.toString()}
        </EditableField>
      </div>
      <div className={[styles.tableCell, styles.tableCellCenter].join(" ")}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faTrash}
            onClick={() => onDelete(data)}
          />
        </div>
      </div>
    </div>
  );
}
