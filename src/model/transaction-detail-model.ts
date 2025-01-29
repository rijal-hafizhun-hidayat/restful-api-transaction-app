import type { m_barang } from "@prisma/client";

export interface TransactionDetailRequest {
  m_barang_id: number;
  harga_bandrol: number;
  qty: number;
  diskon_pct: number;
  diskon_nilai: number;
  harga_diskon: number;
  total: number;
}

export interface SalesDetWithItem {
  id: number;
  t_sales_id: number;
  m_barang_id: number;
  harga_bandrol: number;
  qty: number;
  diskon_pct: number;
  diskon_nilai: number;
  harga_diskon: number;
  total: number;
  item: m_barang;
}
