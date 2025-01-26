import type { t_sales } from "@prisma/client";
import type { Item } from "./item-model";

export interface TransactionRequest {
  items: Item[];
  no_transaction: string;
  date: Date;
  customer_code: string;
  subtotal: number;
  discount: number;
  shipping_cost: number;
  total_price: number;
  qty: number[];
  discount_pct: number[];
  discount_nominal: number[];
  discount_price: number[];
  total: number[];
  name: string;
  phone_number: string;
  is_new_costumer: boolean;
}

export interface TransactionResponse {
  kode: string;
  tgl: Date;
  customer_id: number;
  subtotal: number;
  diskon: number;
  ongkir: number;
  total_bayar: number;
  created_at: Date;
  updated_at: Date;
}

export function toTransactionResponse(
  transaction: t_sales
): TransactionResponse {
  return {
    kode: transaction.kode,
    tgl: transaction.tgl,
    customer_id: transaction.customer_id,
    subtotal: transaction.subtotal.toNumber(),
    diskon: transaction.diskon.toNumber(),
    ongkir: transaction.ongkir.toNumber(),
    total_bayar: transaction.total_bayar.toNumber(),
    created_at: transaction.created_at,
    updated_at: transaction.updated_at,
  };
}
