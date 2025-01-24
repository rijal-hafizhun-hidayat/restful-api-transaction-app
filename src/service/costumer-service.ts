import { prisma } from "../app/database";
import { toCostumerResponse } from "../model/costumer-model";

export class CostumerService {
  static async getAllCostumer() {
    const result = await prisma.m_costumer.findMany({});

    return toCostumerResponse(result);
  }
}
