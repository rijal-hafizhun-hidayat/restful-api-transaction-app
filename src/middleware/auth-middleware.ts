import type { NextFunction, Response } from "express";
import { ErrorResponse } from "../error/error-response";
import type { DecodedToken } from "../model/auth-model";
import { TokenUtil } from "../utils/token-util";
import { prisma } from "../app/database";
import type { CostumeRequest } from "../interface/request-interface";

export const authMiddleware = async (
  req: CostumeRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      statusCode: 403,
      message: "no token provided",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded: DecodedToken = (await TokenUtil.verifyToken(
      token
    )) as DecodedToken;
    const userId: number = decoded.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.user_role?.role,
    };

    req.currentUser = currentUser;
    next();
  } catch (error: any) {
    let errorMessage = "Token invalid";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Token malformed";
    }

    next(new ErrorResponse(401, errorMessage));
  }
};
