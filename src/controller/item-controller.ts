import type { NextFunction, Request, Response } from "express";
import { ItemService } from "../service/item-service";

export class ItemController {
  static async getAllItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await ItemService.getAllItem();
      return res.status(200).json({
        message: "success get item",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
