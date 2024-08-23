import { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { classHelper, join } from "@/lib/cls";
import route from "@/lib/route";
import Select from "@/components/shared/select";
import Icon from "@/components/shared/icon";
import EditableField from "@/components/shared/editableField";
import useProjects from "@/contexts/projects";
import useTasks from "@/contexts/tasks";
import api from "@/services/api";
import { useToast } from "@/lib/toast/hook";

const TaskTable = ({ data }) => {
  const { fetch } = useTasks();
  const refetch = () => {
    fetch({ page: data.page });
  };

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div
          className={classHelper({
            [styles.tableHeaderCell]: true,
            [styles.check]: true,
          })}
        ></div>
        <div className={join(styles.tableHeaderCell, styles.title)}>タスク</div>
        <div className={join(styles.tableHeaderCell, styles.project)}>
          プロジェクト
        </div>
        <div className={join(styles.tableHeaderCell, styles.deadline)}>
          期限日
        </div>
        <div className={join(styles.tableHeaderCell, styles.detail)}></div>
      </div>
      <div className={styles.tableBody}>
        {data.length === 0 ? (
          <div className={styles.tableRow}>
            <td>タスクが登録されていません</td>
          </div>
        ) : null}
        {data.list.map((it) => {
          return <Row key={it.id} data={it} refetch={refetch} />;
        })}
      </div>
    </div>
  );
};

const Row = ({ data, refetch }) => {
  const { options: projectOptions } = useProjects();
  const toast = useToast();

  return (
    <div key={data.id} className={styles.tableRow}>
      <div
        className={classHelper({
          [styles.tableCell]: true,
          [styles.check]: true,
          [styles.unchecked]: true,
        })}
      >
        <Icon
          className={styles.checkIcon}
          name="checkOutline"
          onClick={async () => {
            try {
              await api.updateTask(data.id, { status: "completed" });
              await refetch();
            } catch (e) {
              console.error(e);
              toast.error("更新に失敗しました。");
            }
          }}
        />
      </div>
      <div className={join(styles.tableCell, styles.title)}>
        <EditableField
          defaultValue={data.title}
          onChangeEnd={async (value) => {
            try {
              await api.updateTask(data.id, { title: value });
              await refetch();
            } catch (e) {
              console.error(e);
              toast.error("更新に失敗しました。");
            }
          }}
        />
      </div>
      <div className={join(styles.tableCell, styles.project)}>
        <SelectorProxy
          options={projectOptions}
          defaultValue={data.project?.id}
          defaultOption={{
            label: "プロジェクトを選択してください",
            value: "",
          }}
          onSelect={async (option) => {
            try {
              await api.updateTask(data.id, { projectId: option.value });
              await refetch();
            } catch (e) {
              console.error(e);
              toast.error("更新に失敗しました。");
            }
          }}
        />
      </div>
      <div className={join(styles.tableCell, styles.deadline)}>
        <EditableField
          type="date"
          defaultValue={data.deadline.format() || ""}
          onChangeEnd={async (value) => {
            try {
              await api.updateTask(data.id, { deadline: value });
              await refetch();
            } catch (e) {
              console.error(e);
              toast.error("更新に失敗しました。");
            }
          }}
        />
      </div>
      <div className={join(styles.tableCell, styles.detail)}>
        <Link href={route.tasks.with(data.id)} className={styles.detailLink}>
          <Icon size="20px" name="enter" color="#666" />
        </Link>
        <Icon
          name="delete"
          size="20px"
          color="var(--danger-color)"
          className={styles.deleteIcon}
          onClick={async () => {
            if (!confirm("この操作は取り消せまん。削除しますか？")) {
              return;
            }

            try {
              await api.deleteTask(data.id);
              await refetch();
            } catch (e) {
              console.error(e);
              toast.error("削除に失敗しました。");
            }
          }}
        />
      </div>
    </div>
  );
};

const SelectorProxy = ({ options, defaultValue, defaultOption, onSelect }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Select
      data={options}
      value={value}
      defaultOption={defaultOption}
      onSelect={(option) => {
        setValue(option.value);
        onSelect(option);
      }}
      containerStyleClass={styles.selector}
    />
  );
};

export default TaskTable;
