import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toTransactionResponse,
  type TransactionRequest,
  type TransactionResponse,
} from "../model/transaction-model";
import { CodeUtil } from "../utils/code-util";
import { TransactionValidation } from "../validation/transaction-validation";
import { Validation } from "../validation/validation";

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

  static async storeTransaction(
    request: TransactionRequest
  ): Promise<TransactionResponse> {
    const requestBody: TransactionRequest = Validation.validate(
      TransactionValidation.storeTransactionSchema,
      request
    );

    if (requestBody.is_new_costumer) {
      const isCustomerCodeExist = await prisma.m_customer.findUnique({
        where: {
          kode: requestBody.customer_code,
        },
      });

      if (isCustomerCodeExist) {
        throw new ErrorResponse(404, "kode customer sudah ada");
      }

      await prisma.m_customer.create({
        data: {
          kode: requestBody.customer_code,
          nama: requestBody.name,
          telp: requestBody.phone_number,
        },
      });
    }

    const customer = await prisma.m_customer.findUnique({
      where: {
        kode: requestBody.customer_code,
      },
    });

    if (!customer) {
      throw new ErrorResponse(404, "customer not found");
    }

    const [storeSale] = await prisma.$transaction([
      prisma.t_sales.create({
        data: {
          kode: requestBody.no_transaction,
          tgl: requestBody.date,
          customer_id: customer.id,
          subtotal: requestBody.subtotal,
          diskon: requestBody.discount,
          ongkir: requestBody.shipping_cost,
          total_bayar: requestBody.total_price,
        },
      }),
    ]);

    return toTransactionResponse(storeSale);
  }
}
