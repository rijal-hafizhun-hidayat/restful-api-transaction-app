import { number, string, z, type ZodType } from "zod";

export class ItemValidation {
  static readonly itemSchema: ZodType = z.object({
    id: number().int(),
    kode: string()
      .min(1, {
        message: "kode wajib diisi",
      })
      .regex(/^B\d{4}$/, {
        message:
          "Format kode harus berupa B diikuti 4 digit angka, contoh: B8908",
      }),
    nama: string().min(1, {
      message: "nama wajib diisi",
    }),
    harga: number()
      .min(1, {
        message: "harga wajib diisi",
      })
      .int({
        message: "format harga harus angka",
      }),
  });

  static readonly storeItemSchema: ZodType = z.object({
    code: string()
      .min(1, {
        message: "kode wajib diisi",
      })
      .regex(/^B\d{4}$/, {
        message:
          "Format kode harus berupa B diikuti 4 digit angka, contoh: B8908",
      }),
    name: string().min(1, {
      message: "nama wajib diisi",
    }),
    price: number()
      .min(1, {
        message: "harga wajib diisi",
      })
      .int({
        message: "format harga harus angka",
      }),
  });
}
