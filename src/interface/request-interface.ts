import type { role } from "@prisma/client";
import type { Request } from "express";

export interface CostumeRequest extends Request {
  currentUser?: {
    id: number;
    name: string;
    email: string;
    role?: role;
  };
}
