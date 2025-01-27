import type { NextFunction, Request, Response } from "express";
import type { CurrentUser, LoginRequest } from "../model/auth-model";
import { AuthService } from "../service/auth-service";
import type { CostumeRequest } from "../interface/request-interface";

export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const result = await AuthService.login(request);
      return res.status(200).json({
        message: "login success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const tokenHeader = req.headers.authorization as string;
      const result = await AuthService.logout(tokenHeader);
      return res.status(200).json({
        message: "logout success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async currentUser(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const currentUser: CurrentUser = req.currentUser as CurrentUser;
      return res.status(200).json({
        message: "get current user success",
        data: currentUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
