import type { role } from "@prisma/client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface DecodedToken {
  userId: number;
}

export interface CurrentUser {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at: Date | null;
  role: role;
  profile_picture: string | null;
}

export function toLoginResponse(tokenValue: string): LoginResponse {
  return {
    token: tokenValue,
  };
}
