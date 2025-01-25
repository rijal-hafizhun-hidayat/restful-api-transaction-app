import type { NextFunction, Request, Response } from "express";
import { CustomerService } from "../service/customer-service";

export class CustomerController {
  static async getAllCostumer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await CustomerService.getAllCostumer();
      return res.status(200).json({
        message: "success get customer",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
