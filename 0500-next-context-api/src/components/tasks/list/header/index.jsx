import { useMemo, useState } from "react";
import styles from "./index.module.css";
import api from "@/services/api";
import useTasks from "@/contexts/tasks";
import useProjects from "@/contexts/projects";
import Icon from "@/components/shared/icon";
import useCheck from "@/contexts/check";
import PopupMenu from "@/components/shared/popupMenu";
import { useToast } from "@/lib/toast/hook";

const getActions = ({ onComplete, onArchive, onReopen }) =>
  (
    [
      {
        key: "reopen",
        logo: <Icon name="undo" className={styles.logo} />,
        text: "未完了にする",
        onClick: onReopen,
      },
      {
        key: "complete",
        logo: <Icon name="complete" className={styles.logo} />,
        text: "完了にする",
        onClick: onComplete,
      },
      {
        key: "archive",
        logo: <Icon name="archive" className={styles.logo} />,
        text: "アーカイブ",
        danger: true,
        onClick: onArchive,
      },
    ]
  ).filter((it) => !it.hidden);

const TaskListHeader = ({ projectId }) => {
  const [limit, setLimit] = useState(20);
  const { checked, ids: checkedIds } = useCheck();
  const { projects } = useProjects();
  const toast = useToast();
  const { data, fetch } = useTasks();
  const project = useMemo(
    () => projects.find((it) => projectId === it.id),
    [projects, projectId],
  );

  if (!data) {
    return null;
  }

  const showActionMenu = () => {};

  return (
    <div className={styles.header}>
      <div className={styles.control}>
        <div className={styles.number}>
          <div className={styles.pageIndex}>
            <span>
              {data.page} / {data.pageCount}
            </span>
          </div>
          <div className={styles.displayPageCount}>
            <label>表示件数 : </label>
            <select
              onChange={(e) => {
                const limit = Number(e.target.value);
                setLimit(limit)
                fetch({ limit, page: 1, projectId: project?.id });
              }}
              value={limit}>
              <option value="20">20 件</option>
              <option value="50">50 件</option>
              <option value="100">100 件</option>
            </select>
          </div>
          <div className={styles.pageCount}>
            <span className={styles.total}>{data.total} 件</span>
          </div>
        </div>
        <div className={styles.layout}>
          <div className={styles.controller}>
            {Object.keys(checked).length ? (
              <PopupMenu
                actions={getActions({
                  onComplete: async () => {
                    if (
                      !confirm("選択したタスクを完了しますがよろしいですか？")
                    ) {
                      return;
                    }

                    try {
                      await api.bulkCompleteTask({ ids: checkedIds });
                      toast.success("選択したタスクを完了しました。");
                      fetch({ limit, projectId: project?.id, page: 1 });
                    } catch {
                      toast.error("タスクの完了に失敗しました。");
                    }
                  },
                  onArchive: async () => {
                    if (
                      !confirm(
                        "選択したタスクをアーカイブしますがよろしいですか？",
                      )
                    ) {
                      return;
                    }

                    try {
                      await api.bulkArchiveTask({ ids: checkedIds });
                      toast.success("選択したタスクをアーカイブしました。");
                      fetch({ limit, projectId: project?.id, page: 1 });
                    } catch {
                      toast.error("タスクのアーカイブに失敗しました。");
                    }
                  },
                  onReopen: async () => {
                    if (
                      !confirm(
                        "選択したタスクを未完了にしますがよろしいですか？",
                      )
                    ) {
                      return;
                    }

                    try {
                      await api.bulkReopenTask({ ids: checkedIds });
                      toast.success("選択したタスクを未完了にしました。");
                      fetch({ limit, projectId: project?.id, page: 1 });
                    } catch {
                      toast.error("タスクの未完了処理に失敗しました。");
                    }
                  },
                })}
                trigger={
                  <div className={styles.action}>
                    <Icon name="menu" onClick={showActionMenu} />
                    <div>
                      <p onClick={showActionMenu}>アクション</p>
                    </div>
                  </div>
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListHeader;
