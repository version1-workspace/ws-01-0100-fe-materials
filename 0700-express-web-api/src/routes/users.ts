import { Router } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/users/me", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.currentUserId },
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as usersRouter };
