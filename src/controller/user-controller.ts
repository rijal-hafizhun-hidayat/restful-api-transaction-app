import type { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import type { UserRequest } from "../model/user-model";

export class UserController {
  static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await UserService.getAllUsersWithRole();
      return res.status(200).json({
        message: "success get user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: UserRequest = req.body as UserRequest;
      const result = await UserService.storeUser(request);
      return res.status(200).json({
        message: "success store user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const result = await UserService.getUserByUserId(userId);
      return res.status(200).json({
        message: "success get user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const result = await UserService.destroyUserByUserId(userId);
      return res.status(200).json({
        message: "success destroy user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const request: UserRequest = req.body as UserRequest;
      const result = await UserService.updateUserByUserId(request, userId);
      return res.status(200).json({
        message: "success update user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
