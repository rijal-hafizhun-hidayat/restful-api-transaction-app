import type { NextFunction, Response } from "express";
import type { CostumeRequest } from "../interface/request-interface";
import { RoleUtil } from "../utils/role-util";

export const adminMiddleware = async (
  req: CostumeRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const role = req.currentUser!.role!.name;
  const compareRole = await RoleUtil.compareRole(role, "admin");

  if (!compareRole) {
    return res.status(401).json({
      statusCode: 401,
      errors: "unauthorized",
    });
  }

  next();
};
