"use client";
import { useEffect } from "react";
import styles from "./index.module.css";
import useTasks from "@/contexts/tasks";
import TaskTable from "../table";
import Pagination from "@/components/shared/pagination";
import { CheckContainer } from "@/contexts/check";
import TaskListHeader from "./header";

export default function TaskList({ header, footer }) {
  const { data, fetch } = useTasks();

  useEffect(() => {
    fetch({ page: 1 });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <CheckContainer>
      <div className={styles.container}>
        {header || <TaskListHeader />}
        <TaskTable data={data.list} />
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
    </CheckContainer>
  );
}
