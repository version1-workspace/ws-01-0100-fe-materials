import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

export type CreateUserInput = {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
};

export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExistsError";
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function createUser(input: CreateUserInput) {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: input.email }, { username: input.username }],
    },
  });

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  const hashedPassword = await hashPassword(input.password);

  return prisma.user.create({
    data: {
      username: input.username,
      email: input.email,
      password: hashedPassword,
      refreshToken: input.refreshToken,
      status: "active",
    },
  });
}
