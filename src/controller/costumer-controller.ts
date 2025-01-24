import type { NextFunction, Request, Response } from "express";
import { CostumerService } from "../service/costumer-service";

export class CostumerController {
  static async getAllCostumer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await CostumerService.getAllCostumer();
      return res.status(200).json({
        message: "success get costumer",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
