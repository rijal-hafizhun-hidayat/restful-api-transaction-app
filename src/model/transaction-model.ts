import type { m_customer, t_sales, t_sales_det } from "@prisma/client";
import type { Item } from "./item-model";
import type { SalesDetWithItem } from "./transaction-detail-model";

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

export interface TransactionWithSalesDetAndItemAndCustomer {
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
  sales_det: SalesDetWithItem[];
  customer: m_customer;
}

export interface TransactionWithSalesDetAndItemAndCustomerResponse {
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
  sales_det: Array<{
    id: number;
    t_sales_id: number;
    m_barang_id: number;
    harga_bandrol: number;
    qty: number;
    diskon_pct: number;
    diskon_nilai: number;
    harga_diskon: number;
    total: number;
    item: {
      kode: string;
      nama: string;
      harga: number;
    };
  }>;
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
    subtotal: transaction.subtotal,
    diskon: transaction.diskon,
    ongkir: transaction.ongkir,
    total_bayar: transaction.total_bayar,
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

export function toTransactionWithSalesDetAndItemAndCustomerResponse(
  transaction: TransactionWithSalesDetAndItemAndCustomer
): TransactionWithSalesDetAndItemAndCustomerResponse {
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
    sales_det: transaction.sales_det.map((sale) => ({
      id: sale.id,
      t_sales_id: sale.t_sales_id,
      m_barang_id: sale.m_barang_id,
      harga_bandrol: sale.harga_bandrol,
      qty: sale.qty,
      diskon_pct: sale.diskon_pct,
      diskon_nilai: sale.diskon_nilai,
      harga_diskon: sale.harga_diskon,
      total: sale.total,
      item: {
        kode: sale.item.kode,
        nama: sale.item.nama,
        harga: sale.item.harga,
      },
    })),
    customer: {
      id: transaction.customer.id,
      kode: transaction.customer.kode,
      nama: transaction.customer.nama,
      telp: transaction.customer.telp,
      created_at: transaction.customer.created_at,
      updated_at: transaction.customer.updated_at,
    },
  };
}
