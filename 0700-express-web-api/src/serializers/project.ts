export type PageInfoResponse = {
  totalCount: number;
  limit: number;
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type ProjectStatsResponse = {
  total: number;
  kinds: {
    milestone: number;
    task: number;
    total: number;
  };
  states: {
    scheduled: number;
    completed: number;
    archived: number;
  };
};

export type ProjectResponse = {
  id: string;
  name: string;
  slug: string;
  goal: string;
  shouldbe: string | null;
  color: string | null;
  stats: ProjectStatsResponse;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  startingAt: Date | null;
  startedAt: Date | null;
  finishedAt: Date | null;
};

export type ProjectShowResponse = {
  data: ProjectResponse;
};

export type ProjectsIndexResponse = {
  data: ProjectResponse[];
  pageInfo: PageInfoResponse;
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

export function serializePageInfo(input: PageInfoResponse): PageInfoResponse {
  return input;
}

export function serializeProjectStats(
  tasks: Array<{
    kind: string;
    status: string;
  }>,
): ProjectStatsResponse {
  const stats: ProjectStatsResponse = {
    total: tasks.length,
    kinds: {
      milestone: 0,
      task: 0,
      total: tasks.length,
    },
    states: {
      scheduled: 0,
      completed: 0,
      archived: 0,
    },
  };

  for (const task of tasks) {
    if (task.kind === "milestone") {
      stats.kinds.milestone += 1;
    }

    if (task.kind === "task") {
      stats.kinds.task += 1;
    }

    if (task.status === "scheduled" || task.status === "completed" || task.status === "archived") {
      stats.states[task.status] += 1;
    }
  }

  return stats;
}

export function serializeProject(project: SerializableProject): ProjectResponse {
  return {
    id: project.id,
    name: project.name,
    slug: project.slug,
    goal: project.goal,
    shouldbe: project.shouldbe,
    color: null,
    stats: serializeProjectStats(project.tasks ?? []),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    deadline: project.deadline,
    startingAt: project.startingAt,
    startedAt: project.startedAt,
    finishedAt: project.finishedAt,
  };
}
