import { useMemo, useState } from "react";
import styles from "./index.module.css";
import useTasks from "@/contexts/tasks";
import useProjects from "@/contexts/projects";

const TaskListHeader = ({ projectId }) => {
  const [limit, setLimit] = useState(20);
  const { projects } = useProjects();
  const { data, fetch } = useTasks();
  const project = useMemo(
    () => projects.find((it) => projectId === it.id),
    [projects, projectId],
  );

  if (!data) {
    return null;
  }

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
                setLimit(limit);
                fetch({ limit, page: 1, projectId: project?.id });
              }}
              value={limit}
            >
              <option value="20">20 件</option>
              <option value="50">50 件</option>
              <option value="100">100 件</option>
            </select>
          </div>
          <div className={styles.pageCount}>
            <span className={styles.total}>{data.total} 件</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListHeader;
