import type { t_sales } from "@prisma/client";

export interface TransactionRequest {
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
  id: number;
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
    id: transaction.id,
    kode: transaction.kode,
    tgl: transaction.tgl,
    customer_id: transaction.customer_id,
    subtotal: transaction.subtotal,
    diskon: transaction.diskon,
    ongkir: transaction.ongkir,
    total_bayar: transaction.total_bayar,
    created_at: transaction.created_at,
    updated_at: transaction.updated_at,
  };
}
