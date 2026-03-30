import { ProjectResponse, serializeProject } from "./project";

export type TaskResponse = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
  startedAt: Date | null;
  archivedAt: Date | null;
  startingAt: Date | null;
  deadline: Date;
  project?: ProjectResponse;
  parent: TaskResponse | null;
  children: TaskResponse[];
};

export type TaskShowResponse = {
  data: TaskResponse;
};

export type TasksIndexResponse = {
  data: TaskResponse[];
  pageInfo: import("./project").PageInfoResponse;
};

type SerializableProject = {
  id: string;
  name: string;
  slug: string;
  goal: string;
  shouldbe: string | null;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  startingAt: Date | null;
  startedAt: Date | null;
  finishedAt: Date | null;
  tasks?: Array<{ kind: string; status: string }>;
};

type SerializableTask = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
  startedAt: Date | null;
  archivedAt: Date | null;
  startingAt: Date | null;
  deadline: Date;
  project?: SerializableProject;
  parent?: SerializableTask | null;
  children?: SerializableTask[];
};

export function serializeTask(task: SerializableTask): TaskResponse {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    finishedAt: task.finishedAt,
    startedAt: task.startedAt,
    archivedAt: task.archivedAt,
    startingAt: task.startingAt,
    deadline: task.deadline,
    project: task.project ? serializeProject(task.project) : undefined,
    parent: task.parent ? serializeTask(task.parent) : null,
    children: task.children?.map(serializeTask) ?? [],
  };
}
