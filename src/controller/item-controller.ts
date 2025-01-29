import type { NextFunction, Request, Response } from "express";
import { ItemService } from "../service/item-service";
import type { ItemRequest } from "../model/item-model";

export class ItemController {
  static async getAllItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const search: string | undefined = req.query.search as string;
      const result = await ItemService.getAllItem(search);
      return res.status(200).json({
        message: "success get item",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: ItemRequest = req.body as ItemRequest;
      const result = await ItemService.storeItem(request);
      return res.status(200).json({
        message: "simpan data berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyItemByItemId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const itemId: number = parseInt(req.params.itemId);
      const result = await ItemService.destroyItemByItemId(itemId);
      return res.status(200).json({
        message: "hapus data berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateItemByItemId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: ItemRequest = req.body as ItemRequest;
      const itemId: number = parseInt(req.params.itemId);
      const result = await ItemService.updateItemByItemId(request, itemId);
      return res.status(200).json({
        message: "ubah data berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getItemByItemId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const itemId: number = parseInt(req.params.itemId);
      const result = await ItemService.getItemByItemId(itemId);
      return res.status(200).json({
        message: "ambil data berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async generateItemCode(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await ItemService.generateItemCode();
      return res.status(200).json({
        message: "generate kode barang berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
