import { describe, expect, it } from "vitest";
import { serializePageInfo, serializeProject, serializeProjectStats } from "./project";

describe("project serializers", () => {
  it("stats を集計できる", () => {
    expect(
      serializeProjectStats([
        { kind: "milestone", status: "scheduled" },
        { kind: "task", status: "completed" },
        { kind: "task", status: "archived" },
      ]),
    ).toEqual({
      total: 3,
      kinds: {
        milestone: 1,
        task: 2,
        total: 3,
      },
      states: {
        scheduled: 1,
        completed: 1,
        archived: 1,
      },
    });
  });

  it("project をレスポンス形に整形できる", () => {
    const response = serializeProject({
      id: "project-1",
      name: "Project 1",
      slug: "project-1",
      goal: "goal",
      shouldbe: "shouldbe",
      createdAt: new Date("2026-03-30T00:00:00Z"),
      updatedAt: new Date("2026-03-30T00:00:00Z"),
      deadline: new Date("2026-04-01T00:00:00Z"),
      startingAt: null,
      startedAt: null,
      finishedAt: null,
      tasks: [{ kind: "task", status: "scheduled" }],
    });

    expect(response.id).toBe("project-1");
    expect(response.color).toBeNull();
    expect(response.stats.total).toBe(1);
  });

  it("pageInfo をそのまま返す", () => {
    expect(
      serializePageInfo({
        totalCount: 10,
        limit: 2,
        page: 1,
        hasNext: true,
        hasPrevious: false,
      }),
    ).toEqual({
      totalCount: 10,
      limit: 2,
      page: 1,
      hasNext: true,
      hasPrevious: false,
    });
  });
});
