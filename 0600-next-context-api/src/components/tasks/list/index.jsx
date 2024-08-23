"use client";
import { useEffect } from "react";
import styles from "./index.module.css";
import useTasks from "@/contexts/tasks";
import TaskTable from "../table";
import Pagination from "@/components/shared/pagination";
import TaskListHeader from "./header";
import Skelton from "@/components/shared/skelton";

export default function TaskList({ header, footer }) {
  const { data, fetch, loading } = useTasks();

  useEffect(() => {
    fetch({ page: 1 });
  }, []);

  if (!data || loading) {
    return <Skelton row={20} rowHeight="40px" />;
  }

  return (
    <div className={styles.container}>
      {header || <TaskListHeader />}
      <TaskTable data={data} />
      {footer || (
        <div className={styles.footer}>
          <Pagination
            page={data.page}
            pageCount={data.pageCount}
            hasNext={data.hasNext}
            hasPrevious={data.hasPrevious}
            onFetch={(page) => {
              fetch({ page });
            }}
          />
        </div>
      )}
    </div>
  );
}
