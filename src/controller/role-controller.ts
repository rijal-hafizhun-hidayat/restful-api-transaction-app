import type { NextFunction, Request, Response } from "express";
import { RoleService } from "../service/role-service";
import type { RoleRequest } from "../model/role-model";

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

  static async storeRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: RoleRequest = req.body as RoleRequest;
      const result = await RoleService.storeRole(request);
      return res.status(200).json({
        message: "simpan data berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId: number = parseInt(req.params.roleId);
      const result = await RoleService.destroyRoleByRoleId(roleId);
      return res.status(200).json({
        message: "hapus data berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: RoleRequest = req.body as RoleRequest;
      const roleId: number = parseInt(req.params.roleId);
      const result = await RoleService.updateRoleByRoleId(request, roleId);
      return res.status(200).json({
        message: "ubah data berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId: number = parseInt(req.params.roleId);
      const result = await RoleService.getRoleByRoleId(roleId);
      return res.status(200).json({
        message: "ambil role berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
