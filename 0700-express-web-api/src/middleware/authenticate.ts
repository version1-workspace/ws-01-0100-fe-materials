import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { verifyAccessToken } from "../lib/auth";

type AuthenticatedRequest = Request & {
  currentUserId?: string;
};

function extractBearerToken(req: Request): string | null {
  const authorization = req.header("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length);
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = extractBearerToken(req) ?? req.cookies?.access_token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.currentUserId = user.id;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export type { AuthenticatedRequest };
