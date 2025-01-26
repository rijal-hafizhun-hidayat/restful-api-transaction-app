import type { m_customer } from "@prisma/client";

export interface CostumerResponse {
  id: number;
  kode: string;
  nama: string;
  telp: string;
  created_at: Date;
  updated_at: Date;
}

export function toCostumersResponse(
  costumers: m_customer[]
): CostumerResponse[] {
  return costumers.map((costumer) => ({
    id: costumer.id,
    kode: costumer.kode,
    nama: costumer.nama,
    telp: costumer.telp,
    created_at: costumer.created_at,
    updated_at: costumer.updated_at,
  }));
}
