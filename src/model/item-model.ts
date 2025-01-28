import type { m_barang } from "@prisma/client";

export interface ItemResponse {
  id: number;
  kode: string;
  nama: string;
  harga: number;
  created_at: Date;
  updated_at: Date;
}

export interface ItemRequest {
  code: string;
  name: string;
  price: number;
}

export interface Item {
  id: number;
  kode: string;
  nama: string;
  harga: number;
  created_at: Date;
  updated_at: Date;
}

export function toItemsResponse(items: m_barang[]): ItemResponse[] {
  return items.map((item) => ({
    id: item.id,
    kode: item.kode,
    nama: item.nama,
    harga: item.harga,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));
}

export function toItemResponse(item: m_barang): ItemResponse {
  return {
    id: item.id,
    kode: item.kode,
    nama: item.nama,
    harga: item.harga,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}
