import { prisma } from "../app/database";
import { CodeUtil } from "../utils/code-util";

export class TransactionService {
  static async getCodeTransaction(): Promise<string> {
    let transactionCode: string;
    let isUnique: boolean = false;

    do {
      transactionCode = CodeUtil.generateTransactionCode();
      const isTransactionCodeExist = await prisma.t_sales.findUnique({
        where: {
          kode: transactionCode,
        },
      });

      isUnique = !isTransactionCodeExist;
    } while (!isUnique);

    return transactionCode;
  }
}
