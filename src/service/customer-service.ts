import { prisma } from "../app/database";
import {
  toCostumersResponse,
  type CostumerResponse,
} from "../model/costumer-model";

export class CustomerService {
  static async getAllCostumer(): Promise<CostumerResponse[]> {
    const result = await prisma.m_customer.findMany({});

    return toCostumersResponse(result);
  }
}
