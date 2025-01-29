import { string, z, type ZodType } from "zod";

export class RoleValidation {
  static readonly roleSchema: ZodType = z.object({
    name: string()
      .min(1, {
        message: "nama wajib diisi",
      })
      .max(50, {
        message: "nama maksimal 50 karakter",
      }),
  });
}
