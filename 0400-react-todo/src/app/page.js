"use client";
import { useState } from "react";
import styles from "./page.module.sass";
import Form from "../components/form";
import Table from "../components/table";
import AppDate from "../lib/date";
import { validate } from "../lib/validator";

const todos = [
  {
    id: 1,
    name: "Task 1",
    deadline: new AppDate().getDateInXMonth(1),
  },
  {
    id: 2,
    name: "Task 2",
    deadline: new AppDate().getDateInXMonth(2),
  },
  {
    id: 3,
    name: "Task 3",
    deadline: new AppDate().getDateInXMonth(3),
  },
];

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    deadline: new AppDate().getDateInXMonth(1),
  });
  const [setting, setSetting] = useState({
    showCompleted: false,
  });
  const [data, setData] = useState(todos);

  const maxIndex = Math.max(...data.map((row) => row.id));

  const _data = data.filter((row) => !row.completed || setting.showCompleted);

  const onChangeForm = (data) => {
    setForm({ ...form, ...data });
  };

  const onAdd = (task) => {
    const error = validate(task);
    if (error) {
      alert(error);
      return false;
    }

    const _task = {
      id: maxIndex + 1,
      ...task,
    };
    setData([...data, _task]);
  };

  const onComplete = (task) => {
    const _task = {
      ...task,
      completed: !task.completed,
    };

    onEdit(_task);
  };

  const onEdit = (task) => {
    const tasks = data.reduce((acc, row) => {
      if (row.id === task.id) {
        return [...acc, task];
      }

      return [...acc, row];
    }, []);

    setData(tasks);

    return tasks;
  };

  const onDelete = (task) => {
    if (!confirm("このタスクを削除しますか？")) {
      return;
    }

    const tasks = data.filter((row) => task.id !== row.id);

    setData(tasks);
  };

  const onChangeSetting = (data) => {
    setSetting({ ...setting, ...data });
  };

  return (
    <main className={styles.main}>
      <Form data={form} onChange={onChangeForm} onSubmit={onAdd} />
      <Table
        data={_data}
        setting={setting}
        onComplete={onComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        onChangeSetting={onChangeSetting}
      />
    </main>
  );
}
