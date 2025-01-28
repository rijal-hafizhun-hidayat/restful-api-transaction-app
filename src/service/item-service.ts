import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toItemResponse,
  toItemsResponse,
  type ItemRequest,
  type ItemResponse,
} from "../model/item-model";
import { CodeUtil } from "../utils/code-util";
import { ItemValidation } from "../validation/item-validation";
import { Validation } from "../validation/validation";

export class ItemService {
  static async getAllItem(): Promise<ItemResponse[]> {
    const result = await prisma.m_barang.findMany({});

    return toItemsResponse(result);
  }

  static async storeItem(request: ItemRequest): Promise<ItemResponse> {
    const requestBody: ItemRequest = Validation.validate(
      ItemValidation.storeItemSchema,
      request
    );

    const codeItemExist = await prisma.m_barang.findUnique({
      where: {
        kode: requestBody.code,
      },
    });

    if (codeItemExist) {
      throw new ErrorResponse(404, "kode barang sudah ada");
    }

    const [storeItem] = await prisma.$transaction([
      prisma.m_barang.create({
        data: {
          kode: requestBody.code,
          nama: requestBody.name,
          harga: requestBody.price,
        },
      }),
    ]);

    return toItemResponse(storeItem);
  }

  static async generateItemCode(): Promise<string> {
    let itemCode: string;
    let isUnique: boolean = false;

    do {
      itemCode = CodeUtil.generateItemCode();
      const isItemCodeExist = await prisma.m_barang.findUnique({
        where: {
          kode: itemCode,
        },
      });

      isUnique = !isItemCodeExist;
    } while (!isUnique);

    return itemCode;
  }

  static async destroyItemByItemId(itemId: number): Promise<ItemResponse> {
    const item = await prisma.m_barang.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw new ErrorResponse(404, "data barang tidak ditemukan");
    }

    const [destroyItem] = await prisma.$transaction([
      prisma.m_barang.delete({
        where: {
          id: itemId,
        },
      }),
    ]);

    return toItemResponse(destroyItem);
  }

  static async getItemByItemId(itemId: number): Promise<ItemResponse> {
    const item = await prisma.m_barang.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw new ErrorResponse(404, "data barang tidak ditemukan");
    }

    return toItemResponse(item);
  }

  static async updateItemByItemId(
    request: ItemRequest,
    itemId: number
  ): Promise<ItemResponse> {
    const requestBody: ItemRequest = Validation.validate(
      ItemValidation.storeItemSchema,
      request
    );

    const item = await prisma.m_barang.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw new ErrorResponse(404, "data barang tidak ditemukan");
    }

    const [updateItem] = await prisma.$transaction([
      prisma.m_barang.update({
        where: {
          id: itemId,
        },
        data: {
          kode: requestBody.code,
          nama: requestBody.name,
          harga: requestBody.price,
        },
      }),
    ]);

    return toItemResponse(updateItem);
  }
}
