import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = vi.hoisted(() => ({
  user: {
    findFirst: vi.fn(),
    create: vi.fn(),
    findUnique: vi.fn(),
  },
}));

vi.mock("./prisma", () => ({
  prisma: prismaMock,
}));

import {
  comparePassword,
  createUser,
  findUserProfile,
  hashPassword,
  UserAlreadyExistsError,
} from "./user";

describe("models/user", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("hashPassword と comparePassword が動作する", async () => {
    const hash = await hashPassword("secret123");

    await expect(comparePassword("secret123", hash)).resolves.toBe(true);
    await expect(comparePassword("wrong", hash)).resolves.toBe(false);
  });

  it("createUser は重複ユーザーで例外を投げる", async () => {
    prismaMock.user.findFirst.mockResolvedValue({ id: "existing-user" });

    await expect(
      createUser({
        username: "demo",
        email: "demo@example.com",
        password: "secret123",
        refreshToken: "refresh-token",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("createUser は user を作成する", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({
      id: "user-1",
      username: "demo",
      email: "demo@example.com",
      status: "active",
    });

    const user = await createUser({
      username: "demo",
      email: "demo@example.com",
      password: "secret123",
      refreshToken: "refresh-token",
    });

    expect(prismaMock.user.create).toHaveBeenCalled();
    expect(user.id).toBe("user-1");
  });

  it("findUserProfile は prisma に委譲する", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "user-1",
      username: "demo",
      email: "demo@example.com",
      status: "active",
    });

    const user = await findUserProfile("user-1");

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: "user-1" },
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
      },
    });
    expect(user?.id).toBe("user-1");
  });
});
