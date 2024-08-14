"use client"
import { Fragment, useMemo, useState } from "react"
import styles from "./index.module.css"
import { usePathname } from "next/navigation"
import {
  IoChevronForward as ShowIcon,
  IoChevronBack as HiddenIcon
} from "react-icons/io5"
import route from "@/lib/route"
import useProjects from "@/contexts/projects"
import Link from "@/components/shared/link"
import { classHelper } from "@/lib/cls"
import { truncate } from "@/lib/string"

const colors = (function() {
  const list = []
  for (let i = 0; i < 10; i++) {
    const code = ((i + 1) * 140) % 760
    const r = Math.max(code - 510, 0)
    const g = Math.min(Math.max(code - 255, 0), 255)
    const b = Math.min(255, code)
    list.push(`rgba(${r}, ${g}, ${b}, 0.6)`)
  }

  return list
})()

const projectCountLimit = 5

const sidebarMenulist = projects => [
  {
    title: "ダッシュボード",
    path: "/"
  },
  {
    title: "タスク",
    path: route.tasks.toString()
  },
  {
    title: "プロジェクト"
    ,
    path: route.projects.toString(),
    children: projects.slice(0, projectCountLimit).map(it => {
      return {
        title: it.name,
        path: route.projects.with(it.slug),
        options: {
          deadline: it.deadline?.format()
        }
      }
    }),
    footer: (function() {
      if (projects.length <= projectCountLimit) {
        return null
      }

      return (
        <Link href={route.projects.toString()}>
          <p className={styles.showMoreProjects}>
            あと {projects.length - projectCountLimit} プロジェクト
          </p>
        </Link>
      )
    })()
  }
]

export default function Sidebar() {
  const { projects } = useProjects()
  const [show, setShow] = useState(true)
  const pathname = usePathname()

  const list = useMemo(() => sidebarMenulist(projects), [projects])

  return (
    <div
      className={classHelper({
        [styles.sidebar]: true,
        [styles.sidebarShow]: show,
        [styles.sidebarHidden]: !show
      })}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <span
            className={styles.sidebarToggle}
            onClick={() => setShow(show => !show)}
          >
            {show ? <HiddenIcon /> : <ShowIcon />}
          </span>
        </div>
        <div className={styles.body}>
          {show ? (
            <>
              <ul className={styles.menu}>
                {list.map(menuItem => {
                  return (
                    <Fragment key={menuItem.path}>
                      <li>
                        <Link href={menuItem.path}>
                          <div
                            className={classHelper({
                              [styles.menuItem]: true,
                              [styles.menuItemActive]:
                                pathname === menuItem.path
                            })}
                          >
                            <div className={styles.menuTitle}>{menuItem.title}</div>
                          </div>
                        </Link>
                      </li>
                      {menuItem.children?.length ? (
                        <ul className={styles.children}>
                          {menuItem.children.map((item, index) => {
                            return (
                              <li
                                key={item.path}
                                className={classHelper({
                                  [styles.menuItem]: true,
                                  [styles.menuItemActive]:
                                    pathname === item.path
                                })}
                              >
                                <Link href={item.path}>
                                  <div className={styles.project}>
                                    <div>
                                      <span
                                        className={styles.dot}
                                        style={{
                                          background: colors[index]
                                        }}
                                      ></span>
                                      {typeof item.title === "string"
                                        ? truncate(item.title, 10)
                                        : item.title}
                                    </div>
                                    <span className={styles.deadline}>
                                      {item.options?.deadline}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      ) : null}
                      <div className={styles.menuItemFooter}>
                        {menuItem.footer}
                      </div>
                    </Fragment>
                  )
                })}
              </ul>
            </>
          ) : null}
        </div>
        <div className={styles.footer}></div>
      </div>
    </div>
  )
}
