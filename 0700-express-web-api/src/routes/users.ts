import { Router } from "express";
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
import { toOptionalDate, toPositiveInt } from "./helper";
import {
  ProjectShowResponse,
  ProjectsIndexResponse,
  serializePageInfo,
  serializeProject,
} from "../serializers/project";
import { serializeTask, TaskShowResponse, TasksIndexResponse } from "../serializers/task";
import { serializeUser, UserShowResponse } from "../serializers/user";

const router = Router();

router.get("/users/me", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await findUserProfile(req.currentUserId!);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const response: UserShowResponse = {
      data: serializeUser(user),
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users/projects", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users/projects/:slug", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const project = await findProjectBySlug(req.currentUserId!, String(req.params.slug));

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    const response: ProjectShowResponse = {
      data: serializeProject(project),
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users/tasks", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/users/tasks", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, kind, description, status, deadline, projectId, startingAt } = req.body ?? {};

    if (!title || !kind || !description || !status || !deadline || !projectId) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const project = await findOwnedProject(req.currentUserId!, String(projectId));

    if (!project) {
      res.status(400).json({ message: "Project not found" });
      return;
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users/tasks/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const task = await findTaskById(req.currentUserId!, String(req.params.id));

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const response: TaskShowResponse = {
      data: serializeTask(task),
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/users/tasks/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const taskId = String(req.params.id);
    const currentTask = await findTaskById(req.currentUserId!, taskId);

    if (!currentTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (req.body?.projectId) {
      const project = await findOwnedProject(req.currentUserId!, String(req.body.projectId));

      if (!project) {
        res.status(400).json({ message: "Project not found" });
        return;
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/users/tasks/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const task = await findTaskById(req.currentUserId!, String(req.params.id));

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await deleteTask(task.id);

    const response: TaskShowResponse = {
      data: serializeTask(task),
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as usersRouter };
