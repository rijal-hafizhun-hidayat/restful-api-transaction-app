import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import type { Item } from "../model/item-model";
import type { TransactionDetailRequest } from "../model/transaction-detail-model";
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

    const parseTransactionDetailRequest = this.parseRequestSalesDet(
      requestBody.items,
      requestBody.qty,
      requestBody.discount_pct,
      requestBody.discount_nominal,
      requestBody.discount_price,
      requestBody.total
    );

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
          t_sales_det: {
            create: parseTransactionDetailRequest,
          },
        },
      }),
    ]);

    return toTransactionResponse(storeSale);
  }

  static parseRequestSalesDet(
    items: Item[],
    qty: number[],
    discount_pct: number[],
    discount_nominal: number[],
    discount_price: number[],
    total: number[]
  ): TransactionDetailRequest[] {
    let parsedRequestSalesDet = [];

    if (
      items.length !== qty.length ||
      items.length !== discount_pct.length ||
      items.length !== discount_nominal.length ||
      items.length !== discount_price.length ||
      items.length !== total.length
    ) {
      throw new ErrorResponse(
        400,
        "Jumlah item dan detail lainnya tidak cocok."
      );
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      parsedRequestSalesDet.push({
        m_barang_id: item.id,
        harga_bandrol: item.harga,
        qty: qty[i],
        diskon_pct: discount_pct[i],
        diskon_nilai: discount_nominal[i],
        harga_diskon: discount_price[i],
        total: total[i],
      });
    }

    return parsedRequestSalesDet;
  }
}
