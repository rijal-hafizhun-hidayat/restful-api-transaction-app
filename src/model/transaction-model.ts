import type { m_customer, t_sales, t_sales_det } from "@prisma/client";
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

export interface TransactionWithCustomer {
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
  total_qty: number;
  customer: m_customer;
}

export interface TransactionWithCustomerAndSaleDet {
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
  customer: m_customer;
  sales_det: t_sales_det[];
}

export interface TransactionWithCustomerResponse {
  id: number;
  kode: string;
  tgl: Date;
  subtotal: number;
  diskon: number;
  ongkir: number;
  total_bayar: number;
  created_at: Date;
  updated_at: Date;
  total_qty: number;
  customer: {
    kode: string;
    name: string;
    telp: string;
    created_at: Date;
    updated_at: Date;
  };
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

export function toTransactionsWithCostumerResponse(
  transactions: TransactionWithCustomer[]
): TransactionWithCustomerResponse[] {
  return transactions.map((transaction) => ({
    id: transaction.id,
    kode: transaction.kode,
    tgl: transaction.tgl,
    subtotal: transaction.subtotal,
    diskon: transaction.diskon,
    ongkir: transaction.ongkir,
    total_bayar: transaction.total_bayar,
    total_qty: transaction.total_qty,
    created_at: transaction.created_at,
    updated_at: transaction.updated_at,
    customer: {
      kode: transaction.customer.kode,
      name: transaction.customer.nama,
      telp: transaction.customer.telp,
      created_at: transaction.customer.created_at,
      updated_at: transaction.customer.updated_at,
    },
  }));
}
