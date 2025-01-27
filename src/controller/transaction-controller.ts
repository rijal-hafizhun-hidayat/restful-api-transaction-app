import type { NextFunction, Request, Response } from "express";
import { TransactionService } from "../service/transaction-service";
import type { TransactionRequest } from "../model/transaction-model";

export class TransactionController {
  static async getAllTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const search: string | undefined = req.query.search as string;
      const result = await TransactionService.getAllTransaction(search);
      return res.status(200).json({
        message: "success get transaction",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

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

  static async storeTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: TransactionRequest = req.body as TransactionRequest;
      const result = await TransactionService.storeTransaction(request);
      return res.status(200).json({
        message: "success store transaction",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyTransactionByTransactionId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const transactionId: number = parseInt(
        req.params.transactionId as string
      );
      const result = await TransactionService.destroyTransactionByTransactionId(
        transactionId
      );
      return res.status(200).json({
        message: "success delete transaction",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
