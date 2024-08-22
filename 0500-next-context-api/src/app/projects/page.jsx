"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import route from "@/lib/route";
import Card from "@/components/project/card";
import { useProjectsWithoutContext } from "@/contexts/projects";
import Pagination from "@/components/shared/pagination";
import Skelton from "@/components/shared/skelton";
import styles from "./page.module.css";

export default function Projects() {
  const { fetch, data, loading } = useProjectsWithoutContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    fetch({
      page: Number(page) || 1,
      limit: 10,
      status: ["active"],
    });
  }, [page]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>プロジェクト</h2>
        </div>
        <div className={styles.body}>
          <div className={styles.projectsHeader}>
            {loading ? (
              <p>-- / -- (-- 件)</p>
            ) : (
              <p>
                {data.page} / {data.pageCount} ({data.total} 件)
              </p>
            )}
          </div>
          {loading ? (
            <Skelton row={3} rowHeight="180px" />
          ) : (
            <ul>
              {data.list.map((it) => {
                return (
                  <li key={it.id}>
                    <Link href={route.projects.with(it.slug)}>
                      <Card data={it} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className={styles.footer}>
          <Pagination
            page={data.page}
            pageCount={data.pageCount}
            hasNext={data.hasNext}
            hasPrevious={data.hasPrevious}
            onFetch={(page) => {
              router.push(route.projects.with(`?page=${page}`));
            }}
          />
        </div>
      </div>
    </div>
  );
}
