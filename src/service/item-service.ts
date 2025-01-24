import { prisma } from "../app/database";
import { toItemsResponse, type ItemResponse } from "../model/item-model";

export class ItemService {
  static async getAllItem(): Promise<ItemResponse[]> {
    const result = await prisma.m_barang.findMany({});

    return toItemsResponse(result);
  }
}
