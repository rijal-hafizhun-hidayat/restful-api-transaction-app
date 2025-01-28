import type { m_customer } from "@prisma/client";

export interface CustomerRequest {
  kode: string;
  name: string;
  phone_number: string;
}

export interface CustomerResponse {
  id: number;
  kode: string;
  nama: string;
  telp: string;
  created_at: Date;
  updated_at: Date;
}

export function toCostumersResponse(
  costumers: m_customer[]
): CustomerResponse[] {
  return costumers.map((costumer) => ({
    id: costumer.id,
    kode: costumer.kode,
    nama: costumer.nama,
    telp: costumer.telp,
    created_at: costumer.created_at,
    updated_at: costumer.updated_at,
  }));
}

export function toCustomerResponse(customer: m_customer): CustomerResponse {
  return {
    id: customer.id,
    kode: customer.kode,
    nama: customer.nama,
    telp: customer.telp,
    created_at: customer.created_at,
    updated_at: customer.updated_at,
  };
}
