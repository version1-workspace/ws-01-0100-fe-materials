import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

const projects = [
  {
    id: "01aae611-e02f-46d7-997f-d88cd7842c01",
    name: "プログラミング",
    deadline: "2023/08/12",
    slug: "programming",
    goal: "期限日までにフロントエンドエンジニアとして就職する。",
    shouldbe: "エンジニアとしての学習習慣を身につけて生活する。",
    stats: {
      kinds: {
        milestone: 4,
        task: 30,
        total: 34,
      },
      states: {
        scheduled: 30,
        archived: 3,
        completed: 1,
      },
      total: 132,
    },
    milestones: [],
    status: "active",
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  },
  {
    id: "9a75b860-8587-4a78-98f8-39fae76b82df",
    name: "英語",
    deadline: "2023/08/12",
    slug: "english",
    goal: "IELTS Overall 7.0 を取得する。",
    shouldbe: "英語に浸る。",
    stats: {
      kinds: {
        milestone: 4,
        task: 30,
        total: 34,
      },
      states: {
        scheduled: 30,
        archived: 3,
        completed: 1,
      },
      total: 132,
    },
    milestones: [],
    status: "active",
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  },
  {
    id: "f0647d45-78ec-4eb3-b432-712c3131a080",
    name: "プライベート",
    deadline: "2023/08/12",
    slug: "private",
    goal: "長期休みに旅行をする",
    shouldbe: "",
    stats: {
      kinds: {
        milestone: 4,
        task: 30,
        total: 34,
      },
      states: {
        scheduled: 30,
        archived: 3,
        completed: 1,
      },
      total: 132,
    },
    milestones: [],
    status: "active",
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  },
];

const initProjects = function () {
  globalThis.__datastore.projects = projects;
};

export const initTasks = function () {
  const __tasks = new Array(100).fill("").map((_, index) => ({
    id: uuid(),
    description: "",
    kind: "task",
    title: `タスク ${index + 1}`,
    status: "scheduled",
    createdAt: "2023-08-23T00:00:00-07:00",
    updatedAt: "2023-08-23T00:00:00-07:00",
    deadline: "2023-08-30T00:00:00-07:00",
    children: [],
    project: projects[0],
  }));

  globalThis.__datastore.tasks = __tasks;
};

const stats = [
  {
    label: "完了タスク",
    type: "completed",
    data: [
      {
        date: dayjs().add(-3, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 40),
      },
      {
        date: dayjs().add(-2, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 40),
      },
      {
        date: dayjs().add(-1, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 40),
      },
      {
        date: dayjs().add(0, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 40),
      },
      {
        date: dayjs().add(1, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 40),
      },
      {
        date: dayjs().add(2, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 40),
      },
      {
        date: dayjs().add(3, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 40),
      },
    ],
  },
  {
    label: "予定タスク",
    type: "todo",
    data: [
      {
        date: dayjs().add(-3, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 100),
      },
      {
        date: dayjs().add(-2, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 100),
      },
      {
        date: dayjs().add(-1, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 100),
      },
      {
        date: dayjs().add(0, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 100),
      },
      {
        date: dayjs().add(1, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 100),
      },
      {
        date: dayjs().add(2, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 100),
      },
      {
        date: dayjs().add(3, "day").toDate().getTime(),
        value: Math.floor(Math.random() * 100),
      },
    ],
  },
];

const initStats = () => {
  globalThis.__datastore.stats = stats;
};

export const getStats = () => {
  if (!globalThis.__datastore) {
    init();
  }

  return globalThis.__datastore.stats || [];
};

export const getTasks = () => {
  if (!globalThis.__datastore) {
    init();
  }

  return globalThis.__datastore.tasks || [];
};

export const setTasks = (tasks) => {
  if (!globalThis.__datastore) {
    init();
  }

  globalThis.__datastore.tasks = tasks;
};

export const getProjects = () => {
  if (!globalThis.__datastore) {
    init();
  }

  return globalThis.__datastore.projects || [];
};

export const init = () => {
  globalThis.__datastore = {};
  initStats();
  initProjects();
  initTasks();
};
