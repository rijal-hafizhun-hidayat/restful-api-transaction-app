import { string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly loginSchema: ZodType = z.object({
    email: string()
      .min(1, {
        message: "email wajib diisi",
      })
      .max(50, {
        message: "email maksimal 50 karakter",
      })
      .email({
        message: "wajib format email",
      }),
    password: string()
      .min(1, {
        message: "password wajib diisi",
      })
      .max(50, {
        message: "password maksimal 50 karakter",
      }),
  });
}
