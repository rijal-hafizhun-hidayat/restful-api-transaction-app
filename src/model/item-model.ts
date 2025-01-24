import type { m_barang } from "@prisma/client";
import { NumberUtil } from "../utils/number-util";

export interface ItemResponse {
  id: number;
  kode: string;
  nama: string;
  harga: string;
  created_at: Date;
  updated_at: Date;
}

export function toItemsResponse(items: m_barang[]): ItemResponse[] {
  return items.map((item) => ({
    id: item.id,
    kode: item.kode,
    nama: item.nama,
    harga: NumberUtil.formatToRupiah(Number(item.harga)),
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));
}
