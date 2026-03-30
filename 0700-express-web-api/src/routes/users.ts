import { Router } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../lib/errors";
import { asyncHandler } from "../middleware/async-handler";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { findProjectBySlug, findOwnedProject, listProjects } from "../models/project";
import {
  createTask,
  deleteTask,
  findTaskById,
  listTasks,
  TaskStatus,
  updateTask,
} from "../models/task";
import { findUserProfile } from "../models/user";
import {
  ProjectShowResponse,
  ProjectsIndexResponse,
  serializePageInfo,
  serializeProject,
} from "../serializers/project";
import { serializeTask, TaskShowResponse, TasksIndexResponse } from "../serializers/task";
import { serializeUser, UserShowResponse } from "../serializers/user";
import { toOptionalDate, toPositiveInt } from "./helper";

const router = Router();

router.get("/users/me", authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const user = await findUserProfile(req.currentUserId!);

  if (!user) {
    throw new UnauthorizedError();
  }

  const response: UserShowResponse = {
    data: serializeUser(user),
  };

  res.json(response);
}));

router.get("/users/projects", authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const limit = toPositiveInt(req.query.limit, 20);
  const page = toPositiveInt(req.query.page, 1);
  const skip = (page - 1) * limit;
  const { totalCount, projects } = await listProjects({
    userId: req.currentUserId!,
    skip,
    take: limit,
  });

  const response: ProjectsIndexResponse = {
    data: projects.map(serializeProject),
    pageInfo: serializePageInfo({
      totalCount,
      limit,
      page,
      hasNext: skip + projects.length < totalCount,
      hasPrevious: page > 1,
    }),
  };

  res.json(response);
}));

router.get("/users/projects/:slug", authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const project = await findProjectBySlug(req.currentUserId!, String(req.params.slug));

  if (!project) {
    throw new NotFoundError("Project not found");
  }

  const response: ProjectShowResponse = {
    data: serializeProject(project),
  };

  res.json(response);
}));

router.get("/users/tasks", authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const limit = toPositiveInt(req.query.limit, 20);
  const page = toPositiveInt(req.query.page, 1);
  const skip = (page - 1) * limit;
  const statusQuery = req.query.status;
  const statuses = Array.isArray(statusQuery)
    ? statusQuery
    : typeof statusQuery === "string"
      ? statusQuery.split(",")
      : [];
  const filteredStatuses = statuses.filter(
    (status): status is TaskStatus =>
      status === "scheduled" || status === "completed" || status === "archived",
  );
  const { totalCount, tasks } = await listTasks({
    userId: req.currentUserId!,
    skip,
    take: limit,
    statuses: filteredStatuses,
  });

  const response: TasksIndexResponse = {
    data: tasks.map(serializeTask),
    pageInfo: serializePageInfo({
      totalCount,
      limit,
      page,
      hasNext: skip + tasks.length < totalCount,
      hasPrevious: page > 1,
    }),
  };

  res.json(response);
}));

router.post("/users/tasks", authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { title, kind, description, status, deadline, projectId, startingAt } = req.body ?? {};

  if (!title || !kind || !description || !status || !deadline || !projectId) {
    throw new BadRequestError("Invalid request body");
  }

  const project = await findOwnedProject(req.currentUserId!, String(projectId));

  if (!project) {
    throw new BadRequestError("Project not found");
  }

  const task = await createTask({
    userId: req.currentUserId!,
    projectId: String(projectId),
    title: String(title),
    kind: String(kind),
    description: String(description),
    status: String(status),
    deadline: new Date(String(deadline)),
    startingAt: toOptionalDate(startingAt),
  });

  const response: TaskShowResponse = {
    data: serializeTask(task),
  };

  res.status(201).json(response);
}));

router.get("/users/tasks/:id", authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const task = await findTaskById(req.currentUserId!, String(req.params.id));

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  const response: TaskShowResponse = {
    data: serializeTask(task),
  };

  res.json(response);
}));

router.patch("/users/tasks/:id", authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const taskId = String(req.params.id);
  const currentTask = await findTaskById(req.currentUserId!, taskId);

  if (!currentTask) {
    throw new NotFoundError("Task not found");
  }

  if (req.body?.projectId) {
    const project = await findOwnedProject(req.currentUserId!, String(req.body.projectId));

    if (!project) {
      throw new BadRequestError("Project not found");
    }
  }

  const task = await updateTask(taskId, currentTask.status, currentTask.startedAt, {
    title: req.body?.title,
    kind: req.body?.kind,
    description: req.body?.description,
    status: req.body?.status,
    projectId: req.body?.projectId,
    startingAt: toOptionalDate(req.body?.startingAt),
    deadline: req.body?.deadline ? new Date(req.body.deadline) : undefined,
  });

  const response: TaskShowResponse = {
    data: serializeTask(task),
  };

  res.json(response);
}));

router.delete("/users/tasks/:id", authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const task = await findTaskById(req.currentUserId!, String(req.params.id));

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  await deleteTask(task.id);

  const response: TaskShowResponse = {
    data: serializeTask(task),
  };

  res.json(response);
}));

export { router as usersRouter };
