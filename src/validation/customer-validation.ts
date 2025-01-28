import { string, z, type ZodType } from "zod";

export class CustomerValidation {
  static readonly customerSchema: ZodType = z.object({
    name: string().min(1, {
      message: "nama wajib diisi",
    }),
    kode: string()
      .min(1, {
        message: "kode wajib diisi",
      })
      .regex(/^U\d{4}$/, {
        message:
          "Format kode harus berupa U diikuti 4 digit angka, contoh: U8908",
      }),
    phone_number: string()
      .min(1, {
        message: "nomor telpon wajib diisi",
      })
      .regex(/^(?:\+62|62|0)[2-9][0-9]{7,12}$/, {
        message:
          "Format nomor telepon tidak valid. Gunakan format Indonesia, contoh: 08123456789 atau +628123456789",
      }),
  });
}
