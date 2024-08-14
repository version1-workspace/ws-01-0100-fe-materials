import { ProjectModel } from "@/services/api/models/project";
import { StatsModel } from "@/services/api/models/stats";
import { TaskModel } from "@/services/api/models/task";

import DateDecorater from "@/services/api/models/date";
import { UserModel } from "./user";

const handler = ({ dateFields } = {}) => ({
  get: function (target, name) {
    if (name in target) {
      return target[name];
    }

    if (dateFields?.includes(name)) {
      const value = target._raw[name]?.toString() || "";
      return new DateDecorater(value);
    }

    return target._raw[name];
  },
});

export const factory = {
  project: (params) =>
    new Proxy(
      new ProjectModel(params),
      handler({
        dateFields: ["createdAt", "updatedAt", "deadline"],
      }),
    ),
  stats: (params) => new Proxy(new StatsModel(params), handler()),
  task: (params) =>
    new Proxy(
      new TaskModel(params),
      handler({
        dateFields: [
          "createdAt",
          "updatedAt",
          "finishedAt",
          "startingAt",
          "deadline",
        ],
      }),
    ),
  user: (params) =>
    new Proxy(
      new UserModel(params),
      handler({
        dateFields: ["createdAt", "updatedAt"],
      }),
    ),
};
