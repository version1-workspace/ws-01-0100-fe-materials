"use client";

import Link from "next/link";
import { Suspense } from "react";
import styles from "./page.module.css";
import Card from "@/components/project/card";
import Chart from "@/components/project/chart";
import TaskList from "@/components/tasks/list";
import route from "@/lib/route";
import useProjects from "@/contexts/projects";
import useTasks from "@/contexts/tasks";
import Icon from "@/components/shared/icon";

export default function Main() {
  const { projects } = useProjects();
  const { data } = useTasks();

  return (
    <div className={styles.projects}>
      <div className={styles.dashboard}>
        <div className={styles.projectList}>
          <h2 className={styles.sectionTitle}>プロジェクト</h2>
          <div className={styles.content}>
            {projects.slice(0, 3).map((item) => {
              return (
                <Link key={item.slug} href={route.projects.with(item.slug)}>
                  <Card data={item} />
                </Link>
              );
            })}
          </div>
          <div className={styles.projectListFooter}>
            <Link
              className={styles.projectListLink}
              href={route.projects.toString()}>
              プロジェクト一覧
            </Link>
          </div>
        </div>
        <div className={styles.chart}>
          <h2 className={styles.sectionTitle}>進捗</h2>
          <div className={styles.content}>
            <Chart />
          </div>
        </div>
      </div>
      <div className={styles.todos}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>タスク</h2>
          <Link href={route.tasks.toString()} className={styles.link}>
            タスク一覧
            <Icon size={10} className={styles.linkIcon} name="arrowForward" />
          </Link>
        </div>
        <div className={styles.content}>
          <Suspense>
            <TaskList header={<></>} footer={<></>} />
          </Suspense>
        </div>
        <div className={styles.sectionFooter}>
          {data ? (
            <Link href={route.tasks.toString()} className={styles.link}>
              {(data?.pageCount || 0) > 2
                ? `あと ${data.pageCount - 1} ページ`
                : "タスク一覧"}
              <Icon size={10} className={styles.linkIcon} name="arrowForward" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
