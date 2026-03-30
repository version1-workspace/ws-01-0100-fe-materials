import { describe, expect, it } from "vitest";
import { serializeTask } from "./task";

describe("serializeTask", () => {
  it("task を再帰的にレスポンス形へ整形する", () => {
    const response = serializeTask({
      id: "task-1",
      title: "Task 1",
      description: "desc",
      status: "scheduled",
      createdAt: new Date("2026-03-30T00:00:00Z"),
      updatedAt: new Date("2026-03-30T00:00:00Z"),
      finishedAt: null,
      startedAt: null,
      archivedAt: null,
      startingAt: null,
      deadline: new Date("2026-04-01T00:00:00Z"),
      parent: null,
      children: [
        {
          id: "task-2",
          title: "Task 2",
          description: "child",
          status: "completed",
          createdAt: new Date("2026-03-30T00:00:00Z"),
          updatedAt: new Date("2026-03-30T00:00:00Z"),
          finishedAt: null,
          startedAt: null,
          archivedAt: null,
          startingAt: null,
          deadline: new Date("2026-04-02T00:00:00Z"),
          parent: null,
          children: [],
        },
      ],
    });

    expect(response.id).toBe("task-1");
    expect(response.children).toHaveLength(1);
    expect(response.children[0].id).toBe("task-2");
  });
});
