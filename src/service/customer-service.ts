import { prisma } from "../app/database";
import {
  toCostumersResponse,
  type CostumerResponse,
} from "../model/costumer-model";
import { CodeUtil } from "../utils/code-util";

export class CustomerService {
  static async getAllCostumer(): Promise<CostumerResponse[]> {
    const result = await prisma.m_customer.findMany({});

    return toCostumersResponse(result);
  }

  static async getAllCostumerWithTransaction() {
    const result = await prisma.m_customer.findMany({
      include: {
        t_sales: true,
      },
    });

    return result;
  }

  static async generateCustomerCode(): Promise<string> {
    let customerCode: string;
    let isUnique: boolean = false;

    do {
      customerCode = CodeUtil.generateCustomerCode();
      const isCustomerCodeExist = await prisma.m_customer.findUnique({
        where: {
          kode: customerCode,
        },
      });

      isUnique = !isCustomerCodeExist;
    } while (!isUnique);

    return customerCode;
  }
}
