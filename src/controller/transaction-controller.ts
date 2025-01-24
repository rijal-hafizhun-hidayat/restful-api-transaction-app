import type { NextFunction, Request, Response } from "express";
import { TransactionService } from "../service/transaction-service";

export class TransactionController {
  static async getCodeTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await TransactionService.getCodeTransaction();
      return res.status(200).json({
        message: "success get code transaction",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
