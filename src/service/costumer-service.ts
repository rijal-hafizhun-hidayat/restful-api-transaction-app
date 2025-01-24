import { prisma } from "../app/database";
import {
  toCostumersResponse,
  type CostumerResponse,
} from "../model/costumer-model";

export class CostumerService {
  static async getAllCostumer(): Promise<CostumerResponse[]> {
    const result = await prisma.m_costumer.findMany({});

    return toCostumersResponse(result);
  }
}
