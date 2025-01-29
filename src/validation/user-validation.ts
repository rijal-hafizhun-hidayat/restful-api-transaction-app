import { number, string, union, z, type ZodType } from "zod";
import { RoleValidation } from "./role-validation";

export class UserValidation {
  static readonly roleSchema: ZodType = z.object({
    id: number().int(),
    name: string().min(1),
    created_at: string().datetime(),
    updated_at: string().datetime(),
  });

  static readonly userWithRoleSchema: ZodType = z.object({
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
    name: string()
      .min(1, {
        message: "nama wajib diisi",
      })
      .max(50, {
        message: "nama maksimal 50 karakter",
      }),
    password: string()
      .min(8, {
        message: "password minimal 8 karakter",
      })
      .max(50, {
        message: "password maksimal 50 karakter",
      })
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
        message:
          "password harus mengandung setidaknya satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus (@$!%*?&)",
      }),
    role: union([UserValidation.roleSchema, z.null()]) // Allow null
      .refine((role) => role !== null, {
        message: "Role wajib diisi",
      }),
  });

  static readonly updateUserSchema: ZodType = z.object({
    name: string()
      .min(1, {
        message: "nama wajib diisi",
      })
      .max(50, {
        message: "nama maksimal 50 karakter",
      }),

    email: string()
      .min(1, {
        message: "email wajib diisi",
      })
      .max(50, {
        message: "email maksimal 50 karakter",
      })
      .email({
        message: "format email salah",
      }),
    password: string()
      .optional()
      .refine(
        (value) =>
          value === undefined ||
          value === "" || // Allow undefined or empty string
          (value.length >= 8 &&
            value.length <= 50 &&
            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)),
        {
          message:
            "Password harus kosong atau memenuhi minimal 8 karakter, maksimal 50 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter khusus (@$!%*?&)",
        }
      ),
    role: union([UserValidation.roleSchema, z.null()]).refine(
      (role) => role !== null,
      {
        message: "Role wajib diisi",
      }
    ),
  });
}
