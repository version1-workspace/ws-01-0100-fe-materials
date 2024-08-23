import { ja } from "@/lib/translate";
import { factory } from ".";
import { getProjects } from "@/datastore";

const Status = {
  initial: "initial",
  scheduled: "scheduled",
  completed: "completed",
  archived: "archived",
};

export const selectableStatus = ["scheduled", "completed", "archived"];

const taskStatuses = ja.derive("task.status");

export const statusOptions = selectableStatus.map((it) => {
  return { label: taskStatuses.t(it), value: it };
});

export class TaskModel {
  constructor(params) {
    this.id = params.id;
    this._raw = params;

    this._children = params.children?.map((it) => {
      if (!it.project && params.project) {
        it.project = params.project;
      }

      return factory.task(it) || [];
    });

    if (params.project) {
      this._project = factory.project(params.project);
    }

    if (params.parent) {
      this._parent = factory.task(params.parent);
    }
  }

  get raw() {
    return this._raw;
  }

  get children() {
    return this._children;
  }

  get parent() {
    return this._parent;
  }

  get project() {
    return this._project;
  }

  get isPersist() {
    return this._raw.status !== Status.initial;
  }

  get isArchived() {
    return this._raw.status === "archived";
  }

  get isCompleted() {
    return this._raw.status === "completed";
  }

  get isMilestone() {
    return this._raw.kind === "milestone";
  }

  params() {
    if (!this._raw) {
      return;
    }

    return {
      ...JSON.parse(
        JSON.stringify(this._raw, Object.getOwnPropertyNames(this._raw)),
      ),
      parent: this._raw.project,
    };
  }

  withDeadline(value) {
    const params = this.params();
    if (!params) {
      return;
    }

    params.deadline = value;

    return factory.task(params);
  }

  withTitle(value) {
    const params = this.params();
    if (!params) {
      return;
    }

    params.title = value;

    return factory.task(params);
  }

  scheduled() {
    return this.updateStatus("scheduled");
  }

  complete() {
    return this.updateStatus("completed");
  }

  archive() {
    return this.updateStatus("archived");
  }

  reopen() {
    return this.updateStatus("scheduled");
  }

  trancatedDescription(length = 30, delimiter = "...") {
    if (!this._raw.description) {
      return "";
    }

    return this._raw.description.slice(0, length) + " " + delimiter;
  }

  updateStatus(status) {
    const raw = {
      ...this._raw,
      status,
    };

    return factory.task(raw);
  }

  validate() {
    if (!this._raw.title) {
      return {
        message: "Title is required",
      };
    }

    if (!this._raw.kind) {
      return {
        message: "Kind is required",
      };
    }

    if (!this._raw.status) {
      return {
        message: "Status is required",
      };
    }

    return null;
  }

  assign(params) {
    const filtered = {};
    Object.keys(params).forEach((key) => {
      if (
        ["description", "title", "status", "deadline"].includes(key)
      ) {
        filtered[key] = params[key];
      }

      if (key === "projectId") {
        const project = getProjects().find(
          (project) => project.id === params[key],
        );
        filtered.project = project;
      }
    });

    return new TaskModel({
      ...this._raw,
      ...filtered,
    });
  }
}
