import type { NextFunction, Request, Response } from "express";
import { RoleService } from "../service/role-service";

export class RoleController {
  static async getAllRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await RoleService.getAllRoles();
      return res.status(200).json({
        message: "success get role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
