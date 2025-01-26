import { array, boolean, number, string, z, type ZodType } from "zod";
import { ItemValidation } from "./item-validation";

export class TransactionValidation {
  static readonly storeTransactionSchema: ZodType = z.object({
    items: array(ItemValidation.itemSchema).nonempty({
      message: "barang wajib diisi",
    }),
    no_transaction: string()
      .min(1, {
        message: "no transaksi wajib diisi",
      })
      .max(11, {
        message: "no transaksi maksimal 11 karakter",
      })
      .regex(/^\d{6}-\d{4}$/, {
        message:
          "Format no transaksi harus berupa YYYYMM-NNNN, contoh: 202501-3344",
      }),
    date: string({
      message: "Tanggal masuk wajib diisi",
    }).refine((date) => !isNaN(Date.parse(date)), {
      message: "Format tanggal salah",
    }),
    customer_code: string().regex(/^U\d{4}$/, {
      message:
        "Format customer_code harus berupa U diikuti 4 digit angka, contoh: U8908",
    }),
    subtotal: number({
      message: "subtotal wajib dalam bentuk angka",
    }).int(),
    discount: number({
      message: "discount wajib dalam bentuk angka ",
    }).int(),
    shipping_cost: number({
      message: "ongkir wajib dalam bentuk angka",
    }).int(),
    total_price: number({
      message: "total harga wajib dalam bentuk angka",
    }).int(),
    qty: array(number().int()).nonempty({
      message: "Qty wajib diisi",
    }),
    discount_pct: array(number().int()).nonempty({
      message: "diskon dalam persen wajib diisi",
    }),
    discount_nominal: array(number().int()).nonempty({
      message: "diskon dalam rupiah wajib diisi",
    }),
    discount_price: array(number().int()).nonempty({
      message: "harga setelah diskon wajib diisi",
    }),
    total: array(number().int()).nonempty({
      message: "total harga tiap barang wajib diisi",
    }),
    name: string().min(1, {
      message: "nama wajib diisi",
    }),
    phone_number: z
      .string()
      .min(1, {
        message: "nomor telpon wajib diisi",
      })
      .regex(/^(?:\+62|62|0)[2-9][0-9]{7,12}$/, {
        message:
          "Format nomor telepon tidak valid. Gunakan format Indonesia, contoh: 08123456789 atau +628123456789",
      }),
    is_new_costumer: boolean(),
  });
}
